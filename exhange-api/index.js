var express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')

const conversionController = require("./app/controllers/conversion");
const transactionController = require("./app/controllers/transaction");
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/conversion", conversionController);
app.use("/transaction" , transactionController)

app.listen(5000, () => {
  console.log("the app is running ");
});
