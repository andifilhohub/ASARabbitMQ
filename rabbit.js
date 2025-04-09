

const amqp = require('amqplib');

let canal = null;

async function conectar() {
    const conn = await amqp.connect('amqp://andre123:senha123@localhost:5672');
    canal = await conn.createChannel();
    await canal.assertQueue('fila_pedidos');
    await canal.assertQueue('fila_processados');
    console.log('Conectado ao RabbitMQ');
}

function enviarParaFila(nomeFila, dados) {
    if (!canal) throw new Error('Canal não inicializado');
    canal.sendToQueue(nomeFila, Buffer.from(JSON.stringify(dados)));
}

async function consumirDaFila(nomeFila, callback) {
    await canal.consume(nomeFila, (msg) => {
        if (msg !== null) {
            const dados = JSON.parse(msg.content.toString());
            callback(dados);
            canal.ack(msg);
        }
    });
}

module.exports = { conectar, enviarParaFila, consumirDaFila };
