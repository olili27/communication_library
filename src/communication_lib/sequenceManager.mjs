export class SequenceManager {
    constructor() {
        this.sequenceNumber = 0;
    }

    getNextSequenceNumber() {
        this.sequenceNumber++;
        return this.sequenceNumber;
    }
}


