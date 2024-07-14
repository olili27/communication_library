export class HttpHandler {
    #xhr
    constructor() {
        this.#xhr = new XMLHttpRequest();
    }

    #isStatusBetween200InclusiveAnd300(status) {
        return status >= 200 && status < 300;
    }
    
    sendRequest(method, fullEndpoint, payload, onSuccessCallback, onErrorCallback) {
        if(!method) {
            throw "No method given"
        }

        if(!fullEndpoint) {
            throw "No full endpoint given"
        }

        this.#xhr.open(method.toUpperCase(), fullEndpoint, false)

        this.#xhr.setRequestHeader("Content-Type", "application/json");

        const self = this;

        this.#xhr.onreadystatechange = function (e) {
          console.log(self.#xhr.readyState);
          console.log(self.#xhr.status);
        };

      
        this.#xhr.onload = function() {
            // console.log(self.#xhr.readyState);
            // console.log(self.#xhr.status);
            if(self.#xhr.status != 200) {
                onErrorCallback(
                  `server returned error code: ${self.#xhr.status}`
                );
            }
            if(self.#isStatusBetween200InclusiveAnd300(self.#xhr.status) && self.#xhr.readyState == 4) {
                onSuccessCallback(JSON.parse(self.#xhr.responseText))
                return
            }
        }

        this.#xhr.onerror = function (e) {
            if (self.#xhr.status == 0) {
                onErrorCallback("server could not process request")
                return
            } 
        //     console.log(self.#xhr.readyState);
        // console.log(self.#xhr.status);
        onErrorCallback(e);
        return;
        };
        
        Object.keys(payload).length ? this.#xhr.send(JSON.stringify(payload)) : this.#xhr.send();
    }
}