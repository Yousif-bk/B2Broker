/// <reference lib="webworker" />

import { pseudoSocket } from "./utils/pseudoSocket";




addEventListener('message', ({data}) => {
  const response = pseudoSocket(data);
  postMessage(response);
});
