import React from 'react';
import TextField from '@mui/material/TextField';

export const TextBox = ({ label, disabled = false, isRequired = false, type = "text", placeholder = "", defaultValue = "", value = "", setValue }) => {

    return (
        <TextField
            id="outlined-basic"
            label={label}
            isRequired={isRequired}
            type={type}
            placeholder={placeholder}
            defaultValue={defaultValue}
            variant="outlined"
            onChange={(e) => setValue(e.currentTarget.value)}
            value={value}
            disabled={disabled}
            className='text-field-box'
        />
    );
}