import { HttpHandler } from "./httpHandler.mjs"
import { WebsocketHandler } from "./websocketHandler.mjs"
import { PayloadWrapper } from "./wrapper.mjs"
import { QueueManger } from "./destinationQueueManager.mjs"
import { SequenceManager } from "./sequenceManager.mjs"


export class CommunicationLib {
  isInitialized = false;

  constructor(errorCallback) {
    this.errorCallback = errorCallback;
    this.queueManager = new QueueManger();
    this.sequenceManager = new SequenceManager();
    this.payloadWrapper = new PayloadWrapper(this.sequenceManager);
    this.websocketHandler;
    this.httpHandler = new HttpHandler();
    this.startCommunicationModule()
  }

  sendMessage(message, url, tag) {
    let wrappedMessage = this.payloadWrapper.wrapPayload(message, url, tag);
    this.queueManager.addToDestinationQueue(wrappedMessage, this.errorCallback);
  }

  startCommunicationModule() {
    let self = this;
    this.isInitialized = true;
    setInterval(function() {
      self.processHttpQueue();
      self.processWssQueue()
    }, 1000)
  }

  async processHttpQueue() {
      let wrappedMessage = this.queueManager.popFromQueue("http");

      if(wrappedMessage) {
         this.httpHandler.sendRequest(
           "post",
           wrappedMessage.destination,
           wrappedMessage,
           this.successCallBack,
           this.errorCallback
         );
      }
  }

  successCallBack(data) {
    console.log("http response: ",data);
  }

  async processWssQueue() {
      let wrappedMessage = this.queueManager.popFromQueue("ws");

      if(wrappedMessage) {
        this.websocketHandler = new WebsocketHandler(wrappedMessage.destination)
        this.websocketHandler.sendMessage(wrappedMessage);
      }
  }
}