import React from 'react';
import { useState, useEffect } from 'react'
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export const InputBox = ({ inputLabel = "", handleSubmit }) => {
    const [value, setValue] = useState()
    const handleChange = (e) => {
        setValue(e.target.value)
    }
    return (
        <FormControl className="flex-row" sx={{ m: 1, minWidth: 120 }}>
            <TextField value={value} onChange={handleChange} label={inputLabel} id="outlined-basic" />
            <Button variant="outlined" onClick={(e) => handleSubmit(e, value)}>
            שמור
            </Button>
        </FormControl>
    );
}