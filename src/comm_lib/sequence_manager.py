class SequenceManager:
    def __init__(self):
        self.current_sequence = 0

    def get_next_sequence(self):
        self.current_sequence += 1
        return self.current_sequence
