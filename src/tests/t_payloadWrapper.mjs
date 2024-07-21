import { PayloadWrapper } from "../communication_lib/wrapper.mjs";
import { SequenceManager } from "../communication_lib/sequenceManager.mjs";

let sequenceManager = new SequenceManager()
let payloadWrapper = new PayloadWrapper(sequenceManager)
console.log(payloadWrapper);