import { useEffect, useRef } from "react";

export function useWebSocket(userId, onMessage) {
  const wsRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    const ws = new WebSocket(import.meta.env.VITE_WS_URL || "ws://localhost:5000");
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "auth", userId }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    ws.onclose = () => {
      // exponential backoff reconnect
      setTimeout(() => {
        wsRef.current = null;
      }, 1000);
    };

    return () => ws.close();
  }, [userId]);

  return wsRef;
}
