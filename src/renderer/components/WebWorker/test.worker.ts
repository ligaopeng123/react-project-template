import {uuid} from "@gaopeng123/utils";

/* eslint-disable no-restricted-globals */
self.onmessage = (props) => {
    self.postMessage(`worker: ${uuid()}`)
}

export {}
