import React, { useState} from 'react';
import {Button, Dropdown} from 'semantic-ui-react';

import currenciesOptions from '../../data/currencies-data.json'

function AddNewCurrencyDropDown({removedOptionsValues, setvalue, onChange, value}) {

    const [showAddNewCurrencyDropdown,
        setshowAddNewCurrencyDropdown] = useState(false);

    const getValue = (event, data) => {
        setvalue(data.value)
        setshowAddNewCurrencyDropdown(false)
    }

    return <Button size='large' className='currency-dropdown-btn'>
        <Button
            size='big'
            className='currency-dropdown-btn add-new-currency-btn'
            onClick={() => {
            setshowAddNewCurrencyDropdown(true)
        }}
            style={{
            display: showAddNewCurrencyDropdown
                ? "none"
                : "block"
        }}>Add New Currency</Button>
        {showAddNewCurrencyDropdown && <Dropdown
            placeholder='Select Currency'
            fluid
            selection
            search
            options={removedOptionsValues
            ? currenciesOptions.filter((option) => !removedOptionsValues.includes(option.value))
            : currenciesOptions}
            className={'currency-dropdown '}
            onChange={getValue}
            value={value}
            defaultOpen
            onBlur={(e) => {
            setshowAddNewCurrencyDropdown(false)
        }}/>}
    </Button>;

}

export default AddNewCurrencyDropDown;
