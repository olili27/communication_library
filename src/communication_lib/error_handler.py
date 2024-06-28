class ErrorHandler:
    def __init__(self, critical_error_callback):
        self.critical_error_callback = critical_error_callback

    def handle_error(self, error_message):
        self.critical_error_callback(error_message)
