
const Transaction = require('../transaction')

const connection = require('../../connection/connection')

class CashTransaction extends Transaction {
    #referenceNumber ;

    /**
     * Creates A new Cash Transaction 
     * @param {Date} dateOfTransaction 
     * @param {User} sender 
     * @param {User} receiver 
     * @param {Number} referenceNumber 
     * @param {Number} amount 
     * @param {String} currency , like "USD"
     */
    constructor( dateOfTransaction , sender, receiver , referenceNumber, amount,currency) {
        super(dateOfTransaction, sender , receiver , amount , currency)
       
        this.#referenceNumber = referenceNumber;
       
    }

    /**
     * 
     * @returns Transaction Object
     */
    getTransaction() {
        return {
            id:this.id,
            dateOfTransaction: this.date,
            from: this.sender,
            to: this.receiver,
            method:"Cash Transaction",
            referenceNumber: this.#referenceNumber,
            amount: this.amount,
            currency: this.currency
        }
    }

    /**
     * Adds the transaction to the database
     * @returns status of the operation
     */
    async addTransaction() {
        
      
        const sqlQuery = `INSERT INTO transaction (SENDER_EMAIL,RECEIVER_EMAIL,TYPE, AMOUNT , CURRENCY) VALUES ('${this.sender.email
            }', '${this.receiver.email}','cash-transaction', '${this.amount}'   , '${this.currency}' )`;
    
    
        try {
            let {insertId}=  await connection.query(sqlQuery)
                .then(([rows, fields]) => {
                return rows;
                })
                .catch((err) => {throw new Error(e)});
    
            const sqlQuery2 =  `INSERT INTO CASH_TRANSACTION (TRANSACTION_ID,reference_Number) VALUES (${insertId}, ${this.#referenceNumber})`;
    
            return await connection.query(sqlQuery2)
                .then(([rows, fields]) => {
                return "Transaction has been added Successfully to the database";
                })
                .catch((err) => err);

        }
        catch(e) {
            return e
        }
    }
}

module.exports = CashTransaction