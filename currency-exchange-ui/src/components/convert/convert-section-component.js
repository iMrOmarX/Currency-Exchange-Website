import React , {useState} from 'react';
import CurrencyDropdown from '../currency-dropdown/currency-dropdown-component';
import './convert-section-component.css'
import { FaExchangeAlt } from 'react-icons/fa';
import { Button } from 'semantic-ui-react';


function ConvertSection() {

  const [showResult, setshowResult] = useState(false);

  const [fromCurrency, setfromCurrency] = useState(null);
  const [toCurrency, settoCurrency] = useState(null);

  const [amount, setamount] = useState(-1); 

  const [conversionValue, setconversionValue] = useState(0);

  const [isInvalidInput, setisInvalidInput] = useState(false);

  const convertCurrency = async () => {
    if(fromCurrency === null || toCurrency === null || amount=== -1){
      return
    }

    const jsonData = await fetch(`https://freecurrencyapi.net/api/v2/latest?apikey=92b962e0-8460-11ec-a770-697cd1f97345&base_currency=${fromCurrency}`)

    const result = await jsonData.json()

    setconversionValue(result.data[toCurrency]);
    
    setshowResult(true);



  }

  const updateInput = (e) => {
    let newValue = parseFloat(e.target.value);

    if(isNaN(newValue)) {
      setisInvalidInput(true)
    }
    else {
      setisInvalidInput(false)
      setamount(newValue)
    }
  }

  const switchCurrencies = () => {
    let tmp = fromCurrency ;
    setfromCurrency(toCurrency);
    settoCurrency(tmp);
    setconversionValue(1/conversionValue)
  }
  return <div id="convert-section">
    <div className='convert-input-section'>
      <div id="amount-field" className='field'>
          <label><b>Amount</b></label>
          <input type="text" className='amount-input-field ui fluid' onChange={updateInput}/>
          <p className='invalid-error-message' style={{
            display:(isInvalidInput)? "block" : "none",
            color:"red",
            alignSelf: "self-start"
          }}>Please Input a valid amount</p>
        </div>

        <div id="from-currency-field" className='field'>
          <label><b>From</b></label>
          <Button size='big' className='currency-dropdown-container '><CurrencyDropdown className="currency-dropdown" setvalue={setfromCurrency} value={fromCurrency}></CurrencyDropdown></Button>
        </div>

        <button className='switch-btn field' onClick={switchCurrencies}>
          <FaExchangeAlt></FaExchangeAlt>
        </button>

        <div id="to-currency-field" className='field'>
          
          <label><b>To</b></label>
          <Button size='big' className='currency-dropdown-container'><CurrencyDropdown className="currency-dropdown" setvalue={settoCurrency} value={toCurrency}></CurrencyDropdown></Button>
          
          {!showResult && <Button className='field' id="convert-btn" onClick={convertCurrency}>Convert</Button>}
        </div>

    </div>
      

      <div className='result-section' style={{
        display:(showResult)? "flex" : "none"
      }}>   
        <div className='result-right'>
          <div>
            Result
          </div>
          <div>

          {amount}&nbsp; <b> {fromCurrency} </b>&nbsp; = &nbsp;<span className='output-conversion'> {(amount * conversionValue).toFixed(4)}&nbsp; <b>{toCurrency}</b></span>
          </div>
        </div>

        <div className='result-left'>
          <Button id="view-transfer-btn">View Transfer Quote</Button>
        </div>
      </div>
  </div>;
}

export default ConvertSection;
