import websocket
import threading
import asyncio

class WebSocketHandler:
    def __init__(self, error_callback):
        self.error_callback = error_callback
        self.connections = {}

    async def initialize(self, url, tag):
        try:
            ws = websocket.WebSocketApp(url,
                                        on_message=self.on_message,
                                        on_error=self.on_error,
                                        on_close=self.on_close)
            self.connections[tag] = ws
            threading.Thread(target=ws.run_forever).start()
            return True
        except Exception as e:
            self.error_callback(f"WebSocket initialization error for {url}: {str(e)}")
            return False

    async def send_message(self, url, message):
        try:
            ws = self.connections[url]
            ws.send(message)
        except Exception as e:
            self.error_callback(f"WebSocket send error: {str(e)}")

    async def receive_message(self, url, reply_to):
        try:
            ws = self.connections[url]
            while True:
                message = ws.recv()
                if message:
                    self.handle_received_message(message, reply_to)
                await asyncio.sleep(1)
        except Exception as e:
            self.error_callback(f"WebSocket receive error: {str(e)}")

    def handle_received_message(self, message, reply_to):
        # Unwrap and handle message, then place in the reply queue
        payload, destination, sequence, reply_to = self.unwrap_message(message)
        self.queue_manager.put_message(reply_to, payload)

    def on_message(self, ws, message):
        self.handle_received_message(message, "frontend_reply")

    def on_error(self, ws, error):
        self.error_callback(f"WebSocket error: {str(error)}")

    def on_close(self, ws, close_status_code, close_msg):
        self.error_callback(f"WebSocket closed with code: {close_status_code}, message: {close_msg}")
