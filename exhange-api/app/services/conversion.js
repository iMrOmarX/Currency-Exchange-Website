
const fetch = require('node-fetch');

class ConversionService {
    #DATA_API = 'https://freecurrencyapi.net/api/v2/'
    #API_KEY = '92b962e0-8460-11ec-a770-697cd1f97345'
    
    #availableCurrenciesList ;

    constructor() {
        //this.availableCurrenciesList = JSON.parse(fs.readFileSync('./currencies-data.json'));
    }
    async convertCurrency(from) {

        // if(!availableCurrenciesList.includes(from) || !availableCurrenciesList.includes(to)){
        //     return "Invalid curriencies"
        // }
        try {
            let jsonData = await fetch(this.#DATA_API + "latest?apikey=" + this.#API_KEY + '&base_currency=' + from)
            let result = await jsonData.json();

            return result.data
        }
        catch(e) {
            return e
        }
    }

    async changeRate(from ) {
        function getYesterdayDate() {
            let s = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

            return s.getFullYear() + '-' + ((s.getMonth() < 10)
                ? ('0' + (s.getMonth() + 1))
                : (s.getMonth() + 1)) + '-' + ((s.getDate() < 10)
                ? '0' + s.getDate()
                : s.getDate());
        }

        try {
            let jsonData = await fetch(`${this.#DATA_API}historical?apikey=${this.#API_KEY}&base_currency=${from}&date_from=${getYesterdayDate()}`)
            let result = await jsonData.json();


            let data = result.data 

            let changeRates = {}

            for (const curr in data[Object.keys(data)[0]]) {
    
                let before = data[Object.keys(data)[0]][curr]
                let after = data[Object.keys(data)[1]][curr]
                changeRates[curr] = (((after - before) / before) * 100);

            }
            return changeRates
        }
        catch(e) {
            return e
        }
    }



}

module.exports = ConversionService;