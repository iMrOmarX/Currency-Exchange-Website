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
        return {
            key: element.currency.code,
            text: element.currency.code + " - " +  element.currency.name,
            value: element.currency.code,
            flag: element.currency.code.substring(0,2).toLowerCase()
        }
    });

    const seen = new Set();
    let filteredData = newData.filter(el => {
        const duplicate = seen.has(el.key);
        seen.add(el.key);
        return !duplicate;
    })
    let jsondata = JSON.stringify(filteredData);
    fs.writeFileSync('../../../data/currencies-data.json', jsondata);   
});

console.log('This is after the read call');