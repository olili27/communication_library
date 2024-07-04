export class QueueManger {
    constructor() {
        this.queues = {}
    }

    getQueue(destination) {
          return this.queues[destination]
    }

    addToDestinationQueue(message, destination) {
        if(!this.getQueue(destination)) {
            this.queues[destination] = []
        }

       this.getQueue(destination).push(message)
    }

    isEmpty(queue) {
        if(queue.length > 0) {
            return false
        } else {
            return true
        }
    }

    removeFromDestinationQueue(destination) {
        if (this.getQueue(destination)) {
          return this.getQueue(destination).shift()
        }
        return undefined
    }
}