
# ASARabbitMQ

### 🇺🇸 A basic application developed for a Software Architecture course, demonstrating **message-based communication using RabbitMQ**.

### 🇧🇷 Uma aplicação simples desenvolvida para uma disciplina de Arquitetura de Software, demonstrando **comunicação baseada em mensagens usando RabbitMQ**.

---

## 📦 How It Works | Como Funciona

- 📤 A **user sends an order** via the frontend →  
  📤 O **usuário envia um pedido** pelo frontend

- 📩 The backend **publishes it to a RabbitMQ queue** →  
  📩 O backend **publica o pedido em uma fila no RabbitMQ**

- 🏗️ The **warehouse (almoxarifado)** service **consumes** the message and processes it on demand →  
  🏗️ O serviço de **almoxarifado consome** a fila e processa o pedido sob demanda

- 🔁 A new message with updated status is sent to another queue →  
  🔁 Uma nova mensagem com status atualizado é enviada para outra fila

---

## 🚀 Getting Started | Primeiros Passos

### 🔧 Backend

No diretório raiz do projeto / In the root folder:

```bash
node pedidos.js
node almoxarifado.js
```

⚠️ Certifique-se de que o **RabbitMQ** está rodando localmente em `localhost:5672`.  
Make sure RabbitMQ is running on `localhost:5672`.

---

### 💻 Frontend

```bash
cd front
npm install
npm run dev
```

Acesse o sistema em / Access the system at:  
👉 `http://localhost:5173`

---

## 🧰 Stack

- **Node.js** + **Express**  
- **React (Vite)**  
- **RabbitMQ** (fila de mensagens)  
- **Axios** (requisições HTTP)

---

## 📸 Architecture Overview

![ASAR Architecture](ASAR.png)
