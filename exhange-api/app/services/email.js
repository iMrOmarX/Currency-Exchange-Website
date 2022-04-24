
const sgMail = require('@sendgrid/mail')

class EmailService {
    #API_KEY = "<API_KEY>"

    #from ='currency.exhange.pseu@gmail.com'

    constructor() {
        sgMail.setApiKey(this.#API_KEY)
    }

    async #sendEmail(to , subject , text ,html ) {
        const msg = {
            to: to, // Change to your recipient
            from: this.#from, // Change to your verified sender
            subject: subject,
            html: html,
        }

        try {
            await sgMail.send(msg)
            
            return "email has been sent"
        }
        catch(e) {
            console.error(e)
            return e
        }
    }


    /**
     * 
     * @param {Transaction} transaction  
     */
    async sendTransactionEmail(transaction) {
        let transactionInfo = transaction.getTransaction();
        //console.log(transactionInfo.amount)
        let html = `
            <strong>
                ${transactionInfo.from.getUser().name}  , you have recieved ${transactionInfo.amount} ${transactionInfo.currency} from ${transactionInfo.to.getUser().name}
            </strong>
        `
        try {
            let x = await this.#sendEmail(transactionInfo.to.getUser().email , "Transaction has been Made" ,"" , html)
            console.log(x)
        }
        catch(e) {
            console.error(e)
        }

    }
}

module.exports = EmailService