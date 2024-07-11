import { HttpHandler } from "./httpHandler.mjs"
import { WebsocketHandler } from "./websocketHandler.mjs"
import { ErrorHandler } from "./errorHandler.mjs"
import { PayloadWrapper } from "./wrapper.mjs"
import { QueueManger } from "./destinationQueueManager.mjs"


class CommunicationLib {
    #httpHandler = "";
    isOpen = true;

    constructor(errorCallback) {
        this.errorCallback = errorCallback;
        this.sequenceManager = new QueueManger();
        this.payloadWrapper = new PayloadWrapper(this.sequenceManager);
        this.websocketHandler = new WebsocketHandler();
        this.httpHandler = new HttpHandler();
    }


}