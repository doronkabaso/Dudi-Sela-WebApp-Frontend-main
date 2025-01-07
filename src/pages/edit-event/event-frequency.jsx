import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ThemeProvider } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import { FrequencyTypes } from '../../pages/club-manager/club-manager/club-helper'

export const EventFrequency = ({ theme, cacheRtl, frequencyType, setFrequencyType }) => {

    const handleOccurrence = (e) => {
        e.stopPropagation()
        e.preventDefault()
        setFrequencyType(e.target.value);
    };

    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                <div dir="rtl" className="occurrence-container flex align-center" >
                    <Box className="schedule-occurrence-container flex-column">
                        <Typography className="modal-body-text">
                            בחירת תדירות
                        </Typography>
                        <Box style={{ maxWidth: "10rem" }} className="select-occurrence-container">
                            <FormControl fullWidth>
                                <InputLabel id="select-occurrence-label">תדירות</InputLabel>
                                <Select
                                    labelId="select-occurrence-label"
                                    className="select-occurrence"
                                    value={frequencyType}
                                    onChange={(e) => handleOccurrence(e)}>
                                    <MenuItem value={FrequencyTypes[0]} className="select-occurrence-item">חד פעמי</MenuItem>
                                    <MenuItem value={FrequencyTypes[1]} className="select-occurrence-item">שבועי</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                </div>
            </ThemeProvider>
        </CacheProvider>
    )
}