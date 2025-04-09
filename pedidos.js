const express = require('express');
const amqp = require('amqplib');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const RABBITMQ_URL = 'amqp://localhost';
const QUEUE_NAME = 'fila_pedidos';

app.post('/pedido', async (req, res) => {
    try {
        const pedido = req.body;

        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME, { durable: true });

        channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(pedido)));
        console.log('Pedido enviado para a fila:', pedido);

        res.status(201).send({ mensagem: 'Pedido enviado com sucesso!' });

        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error('Erro ao enviar para o RabbitMQ:', error);
        res.status(500).send({ erro: 'Erro ao enviar pedido.' });
    }
});

app.listen(3001, () => {
    console.log('Servidor de pedidos rodando na porta 3001');
});
