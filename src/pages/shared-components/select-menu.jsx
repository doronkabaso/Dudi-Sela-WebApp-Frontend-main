import React from 'react';
import { useState, useEffect } from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

export const SelectMenu = ({ inputLabel = "", multiple = false, isRequired = false, placeholder = undefined, defaultValue = undefined, values, setValue }) => {

    const [val, setVal] = useState(defaultValue)
    const handleChange = (event) => {
        setVal(event.target.value);
        setValue(event.target.value);
    };
    useEffect(() => {
        setVal(defaultValue)
    }, [defaultValue])
    return (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>{inputLabel}</InputLabel>
            <Select
                defaultValue={val}
                label={inputLabel}
                onChange={handleChange}
                multiple={multiple}>
                {values.map((v, valIdx) => (
                    <MenuItem key={valIdx} value={v}>{v}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}