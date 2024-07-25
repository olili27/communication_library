import { QueueManger } from "../communication_lib/destinationQueueManager.mjs";
import { PayloadWrapper } from "../communication_lib/wrapper.mjs";
import { SequenceManager } from "../communication_lib/sequenceManager.mjs";


let wrappedMessage = new PayloadWrapper(new SequenceManager()).wrapPayload("some randomId", "http://localhost:5500", "testing")
let queueManager = new QueueManger();

console.log(queueManager.getQueue(wrappedMessage.destination))
queueManager.addToDestinationQueue(
  wrappedMessage,
  "getCashBook"
);

// queueManager.addToDestinationQueue(
//   { branchId: "some randomId", date: "2024-03-23", sequenceNumber: 4 },
//   "getCashBook"
// );
console.log(queueManager);
console.log(queueManager.queues);

console.log(
  queueManager.isEmpty(queueManager.getQueue(wrappedMessage.destination))
);

console.log(queueManager.popFromQueue("http"));

console.log(
  queueManager.isEmpty(queueManager.getQueue(wrappedMessage.destination))
);
// console.log(queueManager.removeFromDestinationQueue("getCashBook"));
// console.log(queueManager.isEmpty(queueManager.getQueue("getCashBook")));
// console.log(queueManager.removeFromDestinationQueue("getCashBook3"));
// console.log(queueManager);