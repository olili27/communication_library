export class PayloadWrapper {
    constructor(sequenceManager) {
        this.sequenceManager = sequenceManager
    }

    wrapPayload(payload, destination, replyTo) {
        return {
            ...payload,
            replyTo,
            destination,
            sequenceNumber: this.sequenceManager.getNextSequenceNumber(),
        }
    }

    unwrapPayload(message) {
        return {
            payload: message.payload
        }
    }
}