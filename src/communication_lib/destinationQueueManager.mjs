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
    }

    addToDestinationQueue(wrappedMessage, errorCallback) {
        if (destination.startsWith("http")) {
          this.getQueue(destination, errorCallback).push(wrappedMessage);
        } else if (destination.startsWith("ws")) {
          this.getQueue(destination, errorCallback).push(wrappedMessage);
        }
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