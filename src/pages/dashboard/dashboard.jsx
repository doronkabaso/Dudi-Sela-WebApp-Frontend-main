import React, { useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { instructorService } from '../../services/instructor.service.js';
import { reservationService } from '../../services/reservation.service.js';
import dayjs from 'dayjs';
import { Typography } from '@mui/material';
import { getCurrentDate, getRows, hoursDataArr, columnsData, weekDayInHebrew, getTbColumns, fillEventSlots, updateTypesEvents } from '../club-manager/club-manager/club-components/schedule-day/schedule-helper.js';
import { FrequencyTypes } from '../club-manager/club-manager/club-helper.jsx'
import { courtService } from '../../services/court.service.js';

export const Dashboard = () => {
  const [date] = useState(getCurrentDate())
  const [types, setTypes] = useState([])
  const [tennisInstructors, setTennisInstructors] = useState([])
  const [rows, setRows] = useState(getRows())
  const START_HOUR_DAY = 6
  const events = useRef([])
  const [columns, setColumns] = useState([])
  const [weekDay] = useState(dayjs().format('dddd'))
  const [dayOfWeek] = useState(weekDay.toLowerCase())
  const [dayInHebrew] = useState(weekDayInHebrew[weekDay])
  const [clubClasses, setClubClasses] = useState([])
  const [courtNumbers, setCourtNumbers] = useState([])


  const updateClassList = useCallback((types, courtNumbers) => {
    updateTypesEvents(types, courtNumbers)
  },[])

  useEffect(() => {
    setTimeout(()=> {
      updateClassList(types, courtNumbers)
    }, 500)
  }, [types, updateClassList, courtNumbers])


  const getReservationsByDate = async (_rows, mDate, _types) => {
    const reservations = await reservationService.queryByDate(mDate)
    events.current.push(...reservations)
    reservations.forEach(reservation => {
      fillEventSlots(_rows, reservation, START_HOUR_DAY, _types)
    });
    setRows(_rows)
    setTypes(_types)
  }

  const setTodaysEvents = useCallback(async (mDate, dayOfWeek, _rows, _types) => {
    let reservations = await reservationService.queryByDayofweek(dayOfWeek.toLowerCase())
    events.current.push(...reservations)
    reservations.forEach(reservation => {
      if (reservation.startDate === mDate || reservation.frequencyType === FrequencyTypes[1]) { // show single day by date or weekly event
        fillEventSlots(_rows, reservation, START_HOUR_DAY, _types)
      }
    });
    getReservationsByDate(_rows, mDate, _types)
  },[])


  const getClubClasses = useCallback(async () => {
    let res = await courtService.getClubClasses()
    setClubClasses(res.data.club_classes)
  }, []);

  const getInstructors = useCallback(async () => {
    let instructors = await instructorService.getInstructors()
    setTennisInstructors(instructors)
  }, [setTennisInstructors])

  const getColumns = useCallback(() => {
    const _columns = getTbColumns(columnsData);
    setColumns(_columns);
  }, [])

  const initSchedule = async () => {
    const res = await courtService.getClubCourts()
    setCourtNumbers(res.data.club_courts)
    return getRows(res.data.club_courts)
  }

  const updateScheduleView = useCallback(async (date, dayOfWeek)=> {
    const _rows = await initSchedule()
    const _types = JSON.parse(JSON.stringify(_rows))
    getInstructors()
    getClubClasses()
    setTodaysEvents(date, dayOfWeek, _rows, _types)
    getColumns()
  }, [])

  useEffect(() => {
    updateScheduleView(date, dayOfWeek)
  }, [date, dayOfWeek])


  return (
    <div className='flex-column align-center justify-center container-block dashboard-container'>
      <Typography component="h1" variant="h5">האקדמיה לטניס דודי סלע</Typography>
      <Typography>{dayInHebrew} {date}</Typography>

      <Box className="dashboard" sx={{ width: '100%', height: 500 }}>
      <DataGrid
          isCellEditable={false}
          columnDefs={{editable: false}}
          rows={rows}
          columns={columns}
          sx={{ fontSize: 16, textOverflow: 'ellipsis' }}
          experimentalFeatures={{ newEditingApi: true }}
          hideFooter={true} />
      </Box>
    </div>

  );
}