import requests
import time

class HTTPHandler:
    def __init__(self, error_callback):
        self.error_callback = error_callback
        self.sessions = {}

    async def initialize(self, url, tag):
        try:
            response = requests.get(url)
            if response.status_code == 200:
                self.sessions[tag] = requests.Session()
                return True
            else:
                self.error_callback(f"HTTP initialization failed for {url}")
                return False
        except Exception as e:
            self.error_callback(f"HTTP initialization error for {url}: {str(e)}")
            return False

    async def send_message(self, url, message, retries=3, delay=5):
        for _ in range(retries):
            try:
                session = self.sessions[url]
                response = session.post(url, data=message)
                if response.status_code == 200:
                    return response.status_code, response.text
                else:
                    time.sleep(delay)
            except Exception as e:
                self.error_callback(f"HTTP send error: {str(e)}")
                time.sleep(delay)
        return 500, "Failed to send message after retries"
