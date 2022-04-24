const express = require("express");
const BankTransaction = require("../models/transaction-methods/back-transaction");
const CashTransaction = require("../models/transaction-methods/cash-transaction")
const User = require("../models/user");
const EmailService = require('../services/email')

const transactionRoute = express.Router();
const emailService = new EmailService();

transactionRoute.post("/make-transaction", async (req, res) => {
  let senderUser = new User(req.body.transaction.senderUser.name,req.body.transaction.senderUser.email );
  let recieverUser = new User(req.body.transaction.recieverUser.name , req.body.transaction.recieverUser.email);

    try {

        await senderUser.addUser()
        await recieverUser.addUser()

        let newTransaction ;
        if(req.body.transaction.type === "bank-transaction") {
            newTransaction = new BankTransaction(new Date(),senderUser , recieverUser , req.body.transaction.accountNumber ,req.body.transaction.amount, req.body.transaction.currency )
            let x = await newTransaction.addTransaction();
            
        }
        else if(req.body.transaction.type === "cash-transaction") {
            newTransaction = new CashTransaction(new Date(),senderUser , recieverUser , req.body.transaction.referenceNumber ,req.body.transaction.amount, req.body.transaction.currency )
            let x = await newTransaction.addTransaction();
            
        }
        else {
            throw new Error("Invalid transaction type")
        }

        emailService.sendTransactionEmail(newTransaction)
        res.send("Transaction has been made");
    }
    catch(e) {
        console.error(e)
        res.status(500).send();
    }

});


module.exports = transactionRoute;
