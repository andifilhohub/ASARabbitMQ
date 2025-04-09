const express = require('express');
const amqp = require('amqplib');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const RABBITMQ_URL = 'amqp://localhost';
const FILA_PEDIDOS = 'fila_pedidos';
const FILA_PROCESSADOS = 'fila_processados';

app.get('/processar-pedido', async (req, res) => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertQueue(FILA_PEDIDOS, { durable: true });
        await channel.assertQueue(FILA_PROCESSADOS, { durable: true });

        const msg = await channel.get(FILA_PEDIDOS, { noAck: false });

        if (msg) {
            const pedido = JSON.parse(msg.content.toString());

            const pedidoProcessado = {
                ...pedido,
                status: 'processado_almoxarifado',
            };

            channel.sendToQueue(
                FILA_PROCESSADOS,
                Buffer.from(JSON.stringify(pedidoProcessado))
            );

            channel.ack(msg);
            await channel.close();
            await connection.close();

            res.status(200).json(pedidoProcessado);
        } else {
            await channel.close();
            await connection.close();
            res.status(404).json({ erro: 'Nenhum pedido disponível para processar.' });
        }
    } catch (error) {
        console.error('Erro ao consumir pedido:', error);
        res.status(500).json({ erro: 'Erro ao processar pedido.' });
    }
});


app.listen(3002, () => {
    console.log('Servidor do almoxarifado rodando na porta 3002');
});
