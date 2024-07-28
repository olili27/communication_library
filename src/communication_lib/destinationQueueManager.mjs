export class QueueManger {
    constructor() {
        this.queues = {
            http: [],
            wss: []
        };
    }

    getQueue(destination, errorCallback) {
        if(destination.startsWith("http")) {
            return this.queues["http"];
        } else if (destination.startsWith("ws")) {
            return this.queues["wss"];
        }
        return errorCallback("only http and ws are allowed!");
    }

    addToDestinationQueue(wrappedMessage, errorCallback) {
        if (wrappedMessage.destination.startsWith("http")) {
          this.getQueue(wrappedMessage.destination, errorCallback).push(
            wrappedMessage
          );
          return;
        } else if (wrappedMessage.destination.startsWith("ws")) {
          this.getQueue(wrappedMessage.destination, errorCallback).push(
            wrappedMessage
          );
          return;
        }
        errorCallback("only http and ws are allowed!");
    }

    isEmpty(queue) {
        if(queue.length > 0) {
            return false
        } else {
            return true
        }
    }

    popFromQueue(protocol) {
        return this.getQueue(protocol).shift()
    }
}