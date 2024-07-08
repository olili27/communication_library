export class PayloadWrapper {
    constructor(sequenceManager) {
        this.sequenceManager = sequenceManager
    }

    wrapPayload(payload, destination) {
        return {
            ...payload,
            "destination": destination,
            sequenceNumber: this.sequenceManager.getNextSequenceNumber(),
            reply: ""
        }
    }

    unwrapPayload(message) {
        return {
            payload: message.payload
        }
    }
}