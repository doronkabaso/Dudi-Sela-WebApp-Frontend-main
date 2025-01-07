import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { reservationService } from '../../../../../services/reservation.service.js';
import { Loader } from '../../../../../components/loader.jsx';
import { getRows, hoursData, columnsData, getTbColumns, fillEventSlots, updateTypesEvents } from '../../../club-manager/club-components/schedule-day/schedule-helper.js';
import { EditEventModal } from '../../../../edit-event/edit-event.jsx';
import { FrequencyTypes, EmptyEvent } from '../../club-helper.jsx'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert'
import { courtService } from '../../../../../services/court.service.js';

export const ScheduleDay = ({ mDate, dayOfWeek, dayInHebrew, clubClasses, tennisInstructors }) => {
  const [rows, setRows] = useState([])
  const [types, setTypes] = useState([])
  const [openEditEvent, setOpenEditEvent] = useState(false)
  const [selectedCourtNumber, setSelectedCourtNumber] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState()
  const [isEventExists, setIsEventExists] = useState(false)
  const [columns, setColumns] = useState([])
  const events = useRef([])
  const START_HOUR_DAY = 6
  const [messageAlert, setMessageAlert] = useState()
  const [showMessageAlert, setShowMessageAlert] = useState(false)
  const role = useSelector((storeState) => storeState.userModule.role)
  const [courtNumbers, setCourtNumbers] = useState([])

  const handleCloseAlert = () => {
    setShowMessageAlert(false)
  }

  const alertAction = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="#F2F6F7"
        onClick={handleCloseAlert}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )

  const getEvent = useCallback((courtNumber, hour) => {
    let foundEvent = events.current.find(event => event.dayOfWeek === dayOfWeek && event.courtNumber === courtNumber && Number(event.startHour.split(":")[0]) <= hour && Number(event.endHour.split(":")[0]) >= hour)
    if (!foundEvent) { // a subscriber event
      setMessageAlert("לא ניתן לערוך הזמנה פרטית של משתמש")
      setShowMessageAlert(true)
    }
    return foundEvent
  }, [dayOfWeek])

  const updateClassList = useCallback((types, courtNumbers) => {
    updateTypesEvents(types, courtNumbers)
  },[])

  const handleEditEvent = useCallback((e, rows) => {
    const courtNum = e.row.courtNumber
    if (courtNum>0) {
      setSelectedCourtNumber(courtNum)
    } else {
      setSelectedCourtNumber(courtNum.split("-")[0])
    }
    if (rows[courtNum-1][e.field] !== "") {
      const foundEvent = getEvent(courtNum, hoursData[e.field])
      if (foundEvent) {
        setSelectedEvent(foundEvent)
        setIsEventExists(true)
        setOpenEditEvent(true)
      }
    } else {
      const _emptyEvent = EmptyEvent;
      _emptyEvent.courtNumber=courtNum
      _emptyEvent.startHour=hoursData[e.field]+":00"
      _emptyEvent.endHour=(hoursData[e.field]+1).toString()+":00"
      setSelectedEvent(_emptyEvent)
      setIsEventExists(false)
      setOpenEditEvent(true)
    }
  }, [getEvent])

  const getColumns = useCallback(() => {
    const _columns = getTbColumns(columnsData);
    setColumns(_columns);
  }, [])

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

  const updateScheduleView = useCallback(async(mDate, dayOfWeek)=> {
    setOpenEditEvent(false)
    const _rows = await initSchedule()
    const _types = JSON.parse(JSON.stringify(_rows))
    setTodaysEvents(mDate, dayOfWeek, _rows, _types)
  }, [setTodaysEvents])

  useEffect(() => {
    getColumns()
  }, [getColumns])


  useEffect(() => {
    setTimeout(()=> {
      updateClassList(types, courtNumbers)
    },100)
  }, [types, updateClassList, courtNumbers])

  useEffect(() => {
    updateScheduleView(mDate, dayOfWeek)
  }, [mDate, dayOfWeek, updateScheduleView])

  const initSchedule = async () => {
    const res = await courtService.getClubCourts()
    setCourtNumbers(res.data.club_courts)
    return getRows(res.data.club_courts)
  }

  const closeEditEvent = () => {
    setOpenEditEvent(false)
  }

  const updateEventInView = async (updatedEvent) => {
    if (updatedEvent) {
      let idx = events.current.findIndex(event => event.id === updatedEvent.id)
      if (idx!==-1) {
        events.current[idx] = updatedEvent
      } else {
        events.current.push(updatedEvent)
      }
      let _rows = JSON.parse(JSON.stringify(rows))
      let _types = JSON.parse(JSON.stringify(types))
      fillEventSlots(_rows, updatedEvent, START_HOUR_DAY, _types)
      setRows(_rows)
      setTypes(_types)
    } else {
      updateScheduleView(mDate, dayOfWeek,)
    }
  }

  const renderModal = () => {
    if (openEditEvent  && role==='admin')  {
      return (
        <EditEventModal selectedRow={rows[selectedCourtNumber-1]} updateEventInView={updateEventInView} selectedEvent={selectedEvent} tennisInstructors={tennisInstructors} clubClasses={clubClasses} selectedCourtNumber={selectedCourtNumber} openEditEvent={openEditEvent} closeEditEvent={closeEditEvent} dayOfWeek={dayOfWeek} dayInHebrew={dayInHebrew} isEventExists={isEventExists} isClubEvent={!selectedEvent.username} />
      )
    }
  }

  const renderMessageAlert = () => {
    if (showMessageAlert) {
      return (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
          action={alertAction}
        >
          <Alert
            severity="info"
            sx={{
              minWidth: '100%',
              color: '#1d1d1d',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#50D4F2'
            }}
            spacing={5}
            variant="filled"
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >{messageAlert}</Alert>
        </Snackbar>
      )
    }
  }

  return (
    <>
      {renderModal()}
      {renderMessageAlert()}
      <Box className="schedule" sx={{ width: '100%', height: 730 }}
      >
        <DataGrid
          onCellClick={(e) => handleEditEvent(e, rows)}
          onCellDoubleClick={(e) => handleEditEvent(e, rows)}
          onCellEditStart={(e) => handleEditEvent(e, rows)}
          isCellEditable={false}
          columnDefs={{editable: false}}
          rows={rows}
          columns={columns}
          sx={{ m: 2 }}
          experimentalFeatures={{ newEditingApi: true }}
          hideFooter={true}
        />
      </Box>
    </>
  );
}