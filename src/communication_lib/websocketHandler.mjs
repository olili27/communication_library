class WebsocketHandler {
    constructor(url) {
        this.socket = new WebSocket(url);
    }

    sendMessage(message) {
        this.socket.onopen = function() {
            console.log("connected");
        }

        this.onmessage = function(event) {
            console.log(event.data);
        }

        this.sendMessage(JSON.stringify(message));
    }
}