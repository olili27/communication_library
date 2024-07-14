import { WebsocketHandler } from "../communication_lib/websocketHandler.mjs";

let url = "ws://localhost:8765";
// let url = "https://echo.websocket.org/";


let websocketHandler = new WebsocketHandler(url)

// for(let i = 0; i < 10; i++) {
//     let message = {i: i*10}
    
//     websocketHandler.sendMessage(message)
//     websocketHandler.receiveReply();
// }

  websocketHandler.sendMessage({name: "tim"});
  websocketHandler.receiveReply();

  // websocketHandler.sendMessage({ age: 25 });
  // websocketHandler.receiveReply();

  // websocketHandler.sendMessage({ test: "another test" });
  // websocketHandler.receiveReply();