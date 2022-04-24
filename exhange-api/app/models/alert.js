class Alert {
    #id;
    #dateOfRequest;
    #user;
    #currency;
    #amountOfChange;

    constructor(id , user, dateOfRequest, currency , amountOfChange) {
        this.#id = id ;
        this.#user = user; 
        this.#dateOfRequest = dateOfRequest;
        this.#currency = currency ;
        this.#amountOfChange = amountOfChange;
    }

    getAlert() {
        return {
            id: this.#id,
            user = this.#user,
            dateOfRequest = this.#dateOfRequest,
            currency =this.#currency,
            amountOfChange = this.#amountOfChange 
        }
    }
}