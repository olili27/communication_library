import json

class MessageHandler:
    def __init__(self, sequence_manager):
        self.sequence_manager = sequence_manager

    def wrap_message(self, payload, destination, reply_to):
        sequence_number = self.sequence_manager.get_next_sequence()
        message = {
            'sequence': sequence_number,
            'destination': destination,
            'reply_to': reply_to,
            'payload': payload
        }
        return json.dumps(message)

    def unwrap_message(self, message):
        data = json.loads(message)
        return data['payload'], data['destination'], data['sequence'], data['reply_to']
