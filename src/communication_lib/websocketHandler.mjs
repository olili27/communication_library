export class WebsocketHandler {
  constructor(url) {
    this.socket = new WebSocket(url);

    this.socket.onopen = function () {
      console.log("connected successfully...");
    };

    this.socket.onmessage = this.handleMessage.bind(this);

    this.socket.onerror = function (event) {
      console.log("error occurred", event);
    };
  }


  sendMessage(message) {
    if (this.socket.readyState == 1) {
      this.socket.send(JSON.stringify(message));
    }
     else {
      this.socket = new WebSocket(message.destination);
      
      let self = this.socket;

      this.socket.onopen = function () {
        console.log("connected successfully...");
        self.send(JSON.stringify(message));
      };

       this.socket.onmessage = this.handleMessage.bind(this);

       this.socket.onerror = function (event) {
         console.log("error occurred", event);
       };

    }
  }

  handleMessage(event) {
    console.log("received data: ", JSON.parse(event.data));
  }
}


