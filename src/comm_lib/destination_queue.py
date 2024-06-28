from queue import Queue

class QueueManager:
    def __init__(self):
        self.queues = {}

    def get_queue(self, endpoint):
        if endpoint not in self.queues:
            self.queues[endpoint] = Queue()
        return self.queues[endpoint]

    def put_message(self, endpoint, message):
        queue = self.get_queue(endpoint)
        queue.put(message)

    def get_message(self, endpoint):
        queue = self.get_queue(endpoint)
        if not queue.empty():
            return queue.get()
        return None
