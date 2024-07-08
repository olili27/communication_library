class HttpHandler {
    #xhr = new XMLHttpRequest();

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

        this.#xhr.open(method.toUpperCase(), fullEndpoint, true)

        this.#xhr.setRequestHeader("Content-Type", "application/json");

        this.#xhr.onerror = function() {
            onErrorCallback();
            return
        }
        
        const self = this;
        this.#xhr.onload = function() {
            if(self.#isStatusBetween200InclusiveAnd300(self.#xhr.status) && self.#xhr.readyState == 4) {
                onSuccessCallback(this.responseText)
                return
            }
        }

        Object.keys(payload).length ? this.#xhr.send(JSON.stringify(payload)) : this.#xhr.send();
    }
}