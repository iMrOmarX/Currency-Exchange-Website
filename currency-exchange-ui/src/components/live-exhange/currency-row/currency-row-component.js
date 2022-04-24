import { DeleteOutlined } from '@ant-design/icons/lib/icons';
import React from 'react';
import { Button } from 'semantic-ui-react';

function CurrencyRow({editEnabled , index , baseCurrency, setbaseCurrency , currencies,setcurrencies, curr , toggleInverse , data , historyData}) {
    
    
    const showChangeRate = (curr) => {
        if (!historyData || Object.keys(historyData).length === 0) {
            return ""
        }
        const before = historyData[Object.keys(historyData)[0]][curr]
        const after = historyData[Object.keys(historyData)[1]][curr]

        let per = (((after - before) / before) * 100);
        if (toggleInverse) 
            per = -per;
        
        return ((per < 0)
            ? "-"
            : "") + '%' + Math.abs(per.toFixed(6))
    }

    
  return <tr className='currency-data-row' style={{
    position:"relative",
    left:editEnabled?-25:0,
    animation: `fadeIn 1100ms ease-out`}
}>
    <th data-label="Name" className='currecny-th-name' >
            <Button
                className='currency-btn'
                size='big'
                onClick={()=>{
                    let tmp = baseCurrency;
                    setbaseCurrency(curr)
                    setcurrencies([tmp, ...(currencies.filter((s) => s !== curr))])
                     
                }}
                
            >
                <i
                className={"flag " + curr
                .substring(0, 2)
                .toLocaleLowerCase()}></i>
                {curr}
            </Button>
            </th>
    <th data-label="Amount" className={toggleInverse?'currency-data-field-in':"currency-data-field-out"}>{(data[curr])
            ? (toggleInverse)
            ? (1 / data[curr]).toFixed(3) + " " + baseCurrency
            : data[curr]
            : ""}</th>
    <th data-label="Change(24h)" className={toggleInverse?'currency-data-field-in':"currency-data-field-out"}>{showChangeRate(curr)}</th>
    <th data-label="Chart(24h)" className={toggleInverse?'currency-data-field-in':"currency-data-field-out"}></th>

    <th data-label="btn">
        {editEnabled &&<Button disabled>Send</Button>}
        {!editEnabled && <Button>Send</Button>}
        {editEnabled &&<Button
            onClick={() => {
            setcurrencies(currencies.filter((s) => s !== curr))
        }}
        className="remove-currency-btn ">
            <DeleteOutlined/></Button>}
    </th>

</tr>;
}

export default CurrencyRow;
