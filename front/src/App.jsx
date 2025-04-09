import { useState } from 'react';
import axios from 'axios';

function App() {
  const [telaSelecionada, setTelaSelecionada] = useState('envio');
  const [id, setId] = useState('');
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [status, setStatus] = useState('');
  const [pedidoProcessado, setPedidoProcessado] = useState(null);

  const enviarMensagem = async () => {
    try {
      const pedido = {
        id: parseInt(id),
        produto,
        quantidade: parseInt(quantidade),
        status: 'enviado_almoxarifado',
      };

      await axios.post('http://localhost:3001/pedido', pedido);
      setStatus('Pedido enviado com sucesso!');

      setId('');
      setProduto('');
      setQuantidade('');
    } catch (error) {
      console.error(error);
      setStatus('Erro ao enviar pedido.');
    }
  };

  const processarPedido = async () => {
    try {
      const response = await axios.get('http://localhost:3002/processar-pedido');
      setPedidoProcessado(response.data);
    } catch (error) {
      console.error(error);
      setPedidoProcessado({ erro: 'Erro ao processar pedido ou nenhum pedido disponível.' });
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* NavBar */}
      <nav style={{
        backgroundColor: '#333',
        padding: '1rem',
        display: 'flex',
        gap: '1rem',
        color: '#fff'
      }}>
        <button onClick={() => setTelaSelecionada('envio')} style={{ padding: '0.5rem 1rem' }}>
          Enviar Pedido
        </button>
        <button onClick={() => setTelaSelecionada('recebimento')} style={{ padding: '0.5rem 1rem' }}>
          Receber Pedido
        </button>
      </nav>

      {/* Tela de Envio */}
      {telaSelecionada === 'envio' && (
        <div style={{ padding: '2rem' }}>
          <h1>Enviar Pedido para o Almoxarifado</h1>

          <div style={{ marginBottom: '1rem' }}>
            <label>ID do Pedido:</label><br />
            <input type="number" value={id} onChange={(e) => setId(e.target.value)} />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>Produto:</label><br />
            <input type="text" value={produto} onChange={(e) => setProduto(e.target.value)} />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>Quantidade:</label><br />
            <input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
          </div>

          <button onClick={enviarMensagem} style={{ marginTop: '1rem' }}>
            Enviar Pedido
          </button>

          <p>{status}</p>
        </div>
      )}

      {/* Tela de Recebimento */}
      {telaSelecionada === 'recebimento' && (
        <div style={{ padding: '2rem' }}>
          <h1>Receber Pedido do Almoxarifado</h1>
          <button onClick={processarPedido}>Processar Pedido</button>

          {pedidoProcessado && (
            <div style={{ marginTop: '1rem' }}>
              {pedidoProcessado.erro ? (
                <p>{pedidoProcessado.erro}</p>
              ) : (
                <div>
                  <p><strong>ID:</strong> {pedidoProcessado.id}</p>
                  <p><strong>Produto:</strong> {pedidoProcessado.produto}</p>
                  <p><strong>Quantidade:</strong> {pedidoProcessado.quantidade}</p>
                  <p><strong>Status:</strong> {pedidoProcessado.status}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
