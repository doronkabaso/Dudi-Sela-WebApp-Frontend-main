import React from 'react';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export const SwitchInput = ({ label, disabled = false, isRequired = false, value, setValue }) => {

    return (
        <FormControl component="fieldset" variant="standard">
            <FormControlLabel
                control={
                    <Switch
                        checked={value}
                        onChange={setValue}
                        name={value}
                        disabled={disabled}
                        isRequired={isRequired}
                    />
                }
                label={label}
            />
        </FormControl>
    );
}