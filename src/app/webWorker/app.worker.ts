/// <reference lib="webworker" />

import { PseudoSocket } from "../utils/pseudoSocket";





addEventListener('message', ({data}) => {
  const pseudoSocket = new PseudoSocket()
  const response = pseudoSocket.pseudoSocket(data);
  postMessage(response);
});
