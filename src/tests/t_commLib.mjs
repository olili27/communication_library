import { CommunicationLib } from "../communication_lib/communicationLib.mjs";

function errorCallBack(data) {
    console.log("error callback: ", data);
}

let commLib = new CommunicationLib(errorCallBack);
let msgs = [
  [{ otherData: "url", test: "pidscrypt" }, "ws://localhost:8765", "testing"],
  [
    {
      institutionId: "SBuHKw4pEuNr",
      userId: "ppJXfBPRa3dW",
    },
    "http://127.0.0.1:5000/storePreviousDaysInstitutionBranchesCashBooks",
    "storePreviousDaysInstitutionBranchesCashBooks",
  ],
  [
    {
      institutionId: "SBuHKw4pEuNr",
      userId: "ppJXfBPRa3dW",
    },
    "http://127.0.0.1:5000/fetchCollectionSheet",
    "fetchCollectionSheet",
  ],
  [
    {
      institutionId: "SBuHKw4pEuNr",
      userId: "ppJXfBPRa3dW",
    },
    "http://127.0.0.1:5000/getClientList",
    "getClientList",
  ],
  [
    {
      institutionId: "SBuHKw4pEuNr",
      userId: "ppJXfBPRa3dW",
    },
    "http://127.0.0.1:5000/getClientProfile",
    "getClientProfile",
  ],
  [
    {
      institutionId: "SBuHKw4pEuNr",
      userId: "ppJXfBPRa3dW",
    },
    "http://127.0.0.1:5000/getApplicationsToReview",
    "getApplicationsToReview",
  ],
  [{ otherData: "nother", test: "tim" }, "ws://localhost:8765", "again"],
];

msgs.forEach(i => {
commLib.sendMessage(i[0], i[1], i[2])
})

// commLib.sendMessage(
//   {
//     institutionId: "Se2c58nABfp1",
//     userId: "b7kdS68bLt6o",
//   },
//   "http://127.0.0.1:5000/getClientList",
//   "getClientList"
// );

// commLib.sendMessage(
//   { otherData: "url", test: "pidscrypt" },
//   "ws://localhost:8765",
//   "testing"
// );