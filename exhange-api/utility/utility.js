// We have the currencies list but not the way we want them 
// So this file is a script to convert the data to the wanted format 

// Node JS 

'use strict';

const fs = require('fs');

fs.readFile('./countries.json', (err, data) => {
    if (err) throw err;
    let countries = JSON.parse(data);
    let newData = []

    newData = countries.map(element => {
        return element.currency.code
    });

    let filteredData = Array.from(new Set(newData))

    let jsondata = JSON.stringify(filteredData);
    fs.writeFileSync('../data/currencies-data.json', jsondata);   
});

console.log('This is after the read call');