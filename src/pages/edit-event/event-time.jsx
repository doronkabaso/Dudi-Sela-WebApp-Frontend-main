import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { DateFormat } from '../club-manager/club-manager/club-helper'

export const EventTime = ({ theme, cacheRtl, startHour, setStartHour, endHour, setEndHour, date, setDate }) => {
    const { width } = useWindowDimensions()
    const todaysDate = dayjs().format('DD/MM/YYYY')

    const handleDateChange = (dateChanged) => {
        setDate(dayjs(new Date(dateChanged)).format(DateFormat))
    }

    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                <div dir="rtl" className="form-container flex align-center" >
                    <Box className="date-time-container flex-column">
                        <Typography className="modal-body-text">
                            בחירת זמן רצוי
                        </Typography>
                        <Box className="date-time-select flex align-center">
                            <section className="date-container flex justify-between align-center">
                                {(width < 600) ?
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <MobileDatePicker
                                            label="תאריך"
                                            inputFormat="DD/MM/YYYY"
                                            // value={date}
                                            placeholder={todaysDate}
                                            onChange={handleDateChange}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                    : <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DesktopDatePicker
                                            label="תאריך"
                                            inputFormat="DD/MM/YYYY"
                                            // value={date}
                                            placeholder={todaysDate}
                                            onChange={handleDateChange}
                                        // renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>}
                            </section>
                            <section className="hours-container flex align-center justify-between">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Container>
                                    <TextField
                                            label='שעת התחלה'
                                            value={startHour}
                                            placeholder={startHour}
                                            onChange={setStartHour}
                                        />
                                        {/* <TextField
                                            label='שעת התחלה'
                                            type="time"
                                            value={startHour}
                                            placeholder={startHour}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            minutesStep={60}
                                            onChange={setStartHour}
                                            minTime={dayjs().set('hour', 8)}
                                            maxTime={dayjs().set('hour', 17)}
                                        /> */}
                                        {/* <TimeField
                        label='שעת התחלה'
                        value={startHour}
                        placeholder={startHour}
                        minutesStep={60}
                        onChange={(newValue) => setStartHour(newValue)}
                    /> */}
                                        <TextField
                                            label='שעת סיום'
                                            value={endHour}
                                            placeholder={endHour}
                                            onChange={setEndHour}
                                        />
                                    </Container>
                                </LocalizationProvider>
                            </section>
                        </Box>
                    </Box>
                </div>
            </ThemeProvider>
        </CacheProvider>
    )
}