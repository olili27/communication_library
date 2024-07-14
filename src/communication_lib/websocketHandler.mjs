export class WebsocketHandler {
    constructor(url) {
        this.socket = new WebSocket(url);
        // this.replies = [];
    }


    
    sendMessage(message) {
        const self = this;
        
        this.socket.onopen = function() {
            console.log("connected successfully...");
            self.socket.send(JSON.stringify(message));
        }

        //  this.socket.onmessage = function (event) {
        //    self.replies.push(event.data);
        //    console.log(event.data);
        //    console.log(self.replies);
        //  };
        
        this.onerror()
    }

    receiveReply() {
      const self = this;

      console.log(this.socket);

         this.socket.onmessage = function (event) {
          // self.replies.push(event.data);
           console.log(event.data);
          //  console.log(self.replies);

          self.socket.close();// self.onClose() 
         };

         this.onerror()
    }

    onClose() {
      const self = this;
       this.socket.onclose = function () {
        self.socket.close();
         console.log("Connection closed...");
       };
    }
    onerror() {
         this.socket.onerror = function () {
           console.log("error occurred");
         };
    }
}


