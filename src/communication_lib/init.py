from .message_handler import MessageHandler
from .destination_queue import QueueManager
from .http_handler import HTTPHandler
from .ws_handler import WebSocketHandler
from .sequence_manager import SequenceManager
from .error_handler import ErrorHandler
import asyncio

class CommunicationLib:
    def __init__(self, error_callback):
        self.sequence_manager = SequenceManager()
        self.message_handler = MessageHandler(self.sequence_manager)
        self.queue_manager = QueueManager()
        self.http_handler = HTTPHandler(error_callback)
        self.ws_handler = WebSocketHandler(error_callback)
        self.error_handler = ErrorHandler(error_callback)
        self.destinations = {}
        self.initialized = False

    async def initialize_destination(self, url, tag):
        protocol = url.split(':')[0]
        if protocol == 'http' or protocol == 'https':
            success = await self.http_handler.initialize(url, tag)
        elif protocol == 'ws' or protocol == 'wss':
            success = await self.ws_handler.initialize(url, tag)
        else:
            raise ValueError("Unsupported protocol")

        if success:
            self.destinations[tag] = {'url': url, 'protocol': protocol}
            return True
        else:
            return False

    def initialize_system(self):
        self.initialized = True
        return self.initialized

    async def process_message(self, payload, destination_tag, reply_to="no reply expected"):
        if not self.initialized:
            raise RuntimeError("Communication system not initialized")

        if destination_tag not in self.destinations:
            raise ValueError("Unknown destination tag")

        destination = self.destinations[destination_tag]
        wrapped_message = self.message_handler.wrap_message(payload, destination_tag, reply_to)
        self.queue_manager.put_message(destination_tag, wrapped_message)

        message_to_send = self.queue_manager.get_message(destination_tag)
        if destination['protocol'] == 'http' or destination['protocol'] == 'https':
            status, response = await self.http_handler.send_message(destination['url'], message_to_send)
            if status == 200:
                self.queue_manager.put_message("frontend_reply", response)
        elif destination['protocol'] == 'ws' or destination['protocol'] == 'wss':
            await self.ws_handler.send_message(destination['url'], message_to_send)
        else:
            raise ValueError("Unsupported protocol")

    async def receive_message(self, protocol, url, reply_to="frontend_reply"):
        if protocol == 'ws' or protocol == 'wss':
            await self.ws_handler.receive_message(url, reply_to)
