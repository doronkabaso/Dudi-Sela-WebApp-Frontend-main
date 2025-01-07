import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export const CustomCheckbox = ({ label, isRequired=false, value, setValue }) => {

    return (
        <FormControlLabel control={
            <Checkbox
                defaultChecked
                checked={value}
                onChange={setValue}
                inputProps={{ 'aria-label': 'controlled' }}
            />}
            label={label}
        />
    );
}