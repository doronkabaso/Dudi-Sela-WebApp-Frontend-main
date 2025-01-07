import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export const CourtPrice = ({ price, setPrice, paidStatus, setPaidStatus }) => {

  const handlePaidStatusChange = (event) => {
    setPaidStatus(event.target.value);
  };

  const handleAmountChange = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setPrice(e.target.value);
    }
  };

  return (
    <div className="flex align-center">
      <OutlinedInput
        id="outlined-adornment-price"
        startAdornment={<InputAdornment position="start">ש"ח</InputAdornment>}
        size='small'
        value={price}
        onChange={(e) => handleAmountChange(e)}
        placeholder="עלות"
      />
      <RadioGroup
        aria-labelledby="controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={paidStatus}
        row
        onChange={(e) => handlePaidStatusChange(e)}
        className="flex align-center"
      >
        <FormControlLabel value="true" control={<Radio />} label="שולם" />
        <FormControlLabel value="false" control={<Radio />} label="לא שולם" />
      </RadioGroup>
    </div>
  )
}