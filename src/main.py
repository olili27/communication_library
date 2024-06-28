import asyncio
from communication_lib import CommunicationLib

def critical_error_callback(error_message):
    print(f"Critical error: {error_message}")

comms_lib = CommunicationLib(critical_error_callback)

# Initialize system
comms_lib.initialize_system()

# Initialize destinations
async def setup_destinations():
    http_success = await comms_lib.initialize_destination('http://localhost:8000/api/data', 'backend_http')
    ws_success = await comms_lib.initialize_destination('ws://localhost:8765', 'backend_ws')
    print(f"HTTP Initialized: {http_success}, WS Initialized: {ws_success}")

asyncio.run(setup_destinations())

# Process a message
payload = {"user": "john_doe", "message": "Hello, World!"}

async def process_messages():
    status, response = await comms_lib.process_message(payload, 'backend_http', reply_to="process_reply")
    print(f"HTTP Status: {status}, Response: {response}")

    await comms_lib.process_message(payload, 'backend_ws', reply_to="process_reply")

    await comms_lib.receive_message('ws', 'ws://localhost:8765', reply_to="frontend_reply")

asyncio.run(process_messages())
