const express = require("express");
const ConversionService = require('../services/conversion')

const conversionRoute = express.Router();
const conversionService = new ConversionService();

conversionRoute.get("/convert", async (req, res) => {
  
  let result = await conversionService.convertCurrency(req.query.from) ;
  
  res.send(result);
});

conversionRoute.get("/change-rate", async (req, res) => {
  
  let result = await conversionService.changeRate(req.query.from) ;
  res.send(result);
});

module.exports = conversionRoute;
