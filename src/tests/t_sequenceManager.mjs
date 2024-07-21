import { SequenceManager } from "../communication_lib/sequenceManager.mjs";

let sequenceManager = new SequenceManager();
console.log(sequenceManager);
console.log(sequenceManager.getNextSequenceNumber());