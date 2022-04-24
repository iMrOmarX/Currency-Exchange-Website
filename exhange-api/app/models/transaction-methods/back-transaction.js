const Transaction = require('../transaction')
const connection = require('../../connection/connection')
class BankTransaction extends Transaction {
    #accountNumber;
    /**
     * 
     * @param {Date} dateOfTransaction 
     * @param {User} sender 
     * @param {User} receiver 
     * @param {Number} accountNumber 
     * @param {Number} amount 
     * @param {String} currency, like "USD"
     */
    constructor(dateOfTransaction , sender, receiver , accountNumber, amount,currency) {
        super(0 , dateOfTransaction, sender , receiver , amount , currency)
       
        
        this.#accountNumber = accountNumber;
       
    }
    getTransaction() {
        return {
            dateOfTransaction: this.date,
            from: this.sender.getUser(),
            to: this.receiver.getUser(),
            method:"Bank Transaction",
            accountNumber: this.accountNumber,
            amount: this.amount,
            currency: this.currency
        }
    }

    /**
     * Adds the transaction to the database 
     */
    async addTransaction() {
        
      
        const sqlQuery = `INSERT INTO transaction (SENDER_EMAIL,RECEIVER_EMAIL,TYPE, AMOUNT , CURRENCY) VALUES ('${this.sender.getUser().email
        }', '${this.receiver.getUser().email}','bank-transaction', '${this.amount}' , '${this.currency}' )`;
        
        try {
            let {insertId}=  await connection.query(sqlQuery)
                .then(([rows, fields]) => {
                return rows;
                })
                .catch((err) => {throw new Error(e)});
    
            const sqlQuery2 =  `INSERT INTO BANK_TRANSACTION (TRANSACTION_ID,ACCOUNT_NUMBER) VALUES (${insertId}, ${this.#accountNumber})`;
    
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

module.exports =BankTransaction