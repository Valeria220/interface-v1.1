import { WebSocketServer } from 'ws';

export function setupWebSocket(server) {
  const wss = new WebSocketServer({ server });
  const clients = new Set();

  wss.on('connection', (ws) => {
    clients.add(ws);
    console.log('✅ New client connected');

    ws.on('close', () => {
      clients.delete(ws);
      console.log('❌ Client disconnected');
    });
  });

  // Функция для отправки обновлений всем клиентам
  function broadcastUpdate(data) {
    const message = JSON.stringify({ type: 'DATA_UPDATED', data });
    clients.forEach(client => {
      if (client.readyState === client.OPEN) {
        client.send(message);
      }
    });
  }

  return { broadcastUpdate };
}