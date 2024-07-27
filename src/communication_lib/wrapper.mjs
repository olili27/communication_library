export class PayloadWrapper {
    constructor(sequenceManager) {
        this.sequenceManager = sequenceManager
    }

    wrapPayload(message, destination, replyTo) {
        return {
            ...message,
            replyTo,
            destination,
            sequenceNumber: this.sequenceManager.getNextSequenceNumber(),
        }
    }

    unwrapPayload(wrappedMessage) {
        return {
          message: wrappedMessage.message,
          replyTo: wrappedMessage.replyTo
        };
    }
}