export class QueueManger {
    constructor() {
        this.httpQueue = {};
        this.wssQueue = {};
    }

    getQueue(destination, errorCallback) {
        if(destination.startsWith("http")) {
            return this.httpQueue[destination];
        } else if (destination.startsWith("ws")) {
            return this.wssQueue[destination];
        }
    }

    addToDestinationQueue(wrappedMessage, errorCallback) {
        if (destination.startsWith("http")) {
            if (!this.getQueue(destination)) {
              this.httpQueue[destination] = [];
            }
          this.getQueue(destination).push(wrappedMessage);
        } else if (destination.startsWith("ws")) {
            if (!this.getQueue(destination)) {
              this.wssQueue[destination] = [];
            }
          this.getQueue(destination).push(wrappedMessage);
        }
    }

    isEmpty(queue) {
        if(queue.length > 0) {
            return false
        } else {
            return true
        }
    }

    removeFromDestinationQueue(destination) {
        return this.getQueue(destination).shift()
    }
}