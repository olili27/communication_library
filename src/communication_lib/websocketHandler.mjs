export class WebsocketHandler {
  constructor(url, onErrorCallback) {
    this.socket = new WebSocket(url);

    this.socket.onopen = function () {
      console.log("connected successfully...");
    };

    this.socket.onmessage = this.handleMessage.bind(this);

    this.socket.onerror = function (event) {
      console.log("error occurred", event);
      onErrorCallback("error callback called...");
    };
  }

  sendMessage(wrappedMessage, onErrorCallback) {
    if (this.socket.readyState == 1) {
      this.socket.send(JSON.stringify(wrappedMessage));
    } else {
      this.socket = new WebSocket(wrappedMessage.destination);

      let self = this.socket;

      this.socket.onopen = function () {
        console.log("connected successfully...");
        self.send(JSON.stringify(wrappedMessage));
      };

      this.socket.onmessage = this.handleMessage.bind(this);

      this.socket.onerror = function (event) {
        console.log("error occurred", event);
        onErrorCallback("on error callback called.");
      };
    }
  }

  handleMessage(event) {
    console.log("received data: ", JSON.parse(event.data));
  }
}


