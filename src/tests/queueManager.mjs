import { QueueManger } from "../communication_lib/destinationQueueManager.mjs";

let queueManager = new QueueManger()
console.log(queueManager.getQueue("some"))
queueManager.addToDestinationQueue(
  { branchId: "some randomId", date: "2024-03-23", sequenceNumber:2 },
  "getCashBook"
);
queueManager.addToDestinationQueue(
  { branchId: "some randomId", date: "2024-03-23", sequenceNumber: 4 },
  "getCashBook"
);
console.log(queueManager);

console.log(queueManager.isEmpty(queueManager.getQueue("getCashBook")));
console.log(queueManager.removeFromDestinationQueue("getCashBook"));
console.log(queueManager.isEmpty(queueManager.getQueue("getCashBook")));
console.log(queueManager.removeFromDestinationQueue("getCashBook"));
console.log(queueManager.isEmpty(queueManager.getQueue("getCashBook")));
console.log(queueManager.removeFromDestinationQueue("getCashBook3"));
console.log(queueManager);