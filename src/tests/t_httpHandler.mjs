import { HttpHandler } from "../communication_lib/httpHandler.mjs";

function onSuccessCallback(data) {
    console.log(data);
}

function onErrorCallback(e) {
    console.log("some error occurred: =>", e);
}

// let endpoint = "https://echo.websocket.org/";
let endpoint = "http://127.0.0.1:5000/getClientList";
let httpHandler = new HttpHandler()
httpHandler.sendRequest(
  "POST",
  endpoint,
  {
    institutionId: "H2Bpw45EXlhG",
    userId: "Ziob9KvzyPUS",
  },
  onSuccessCallback,
  onErrorCallback
);