import React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Loader } from '../../components/loader.jsx';
import { createTheme } from '@mui/material/styles'
import createCache from '@emotion/cache'
import { EventFrequency } from './event-frequency.jsx'
import { EventTime } from './event-time.jsx'
import { EventType } from './event-type.jsx'
import { CourtPrice } from './court-price.jsx'
import { EventTitle } from './event-title.jsx'
import Divider from '@mui/material/Divider';
import { ParticipantsList } from './participants-list.jsx';
import { EventDescription } from './event-description.jsx';
import { STORAGE_KEY_LOGGED_USER } from '../../services/user.service';
import { eventService } from '../../services/event.service'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert'
import dayjs from 'dayjs'
import { SelectMenu } from '../shared-components/select-menu'
import { courtService } from '../../services/court.service';
import { hoursData } from '../club-manager/club-manager/club-components/schedule-day/schedule-helper.js';
import { reservationService } from "../../services/reservation.service"
import { InputBox } from '../shared-components/input-box.jsx';
import { instructorService } from '../../services/instructor.service.js';
import { hoursDataArr } from '../club-manager/club-manager/club-components/schedule-day/schedule-helper.js';
import { EventTypes } from '../club-manager/club-manager/club-helper.jsx';

export const EditEventModal = ({ selectedRow, updateEventInView, tennisInstructors, clubClasses, selectedEvent, openEditEvent, closeEditEvent, dayOfWeek, isEventExists, isClubEvent, dayInHebrew}) => {

  const [isLoading, setIsLoading] = useState(false)
  const [eventType, setEventType] = useState(selectedEvent.eventType);
  const [startDate, setStartDate] = useState(selectedEvent.startDate);
  const [startHour, setStartHour] = useState(selectedEvent.startHour)
  const [endHour, setEndHour] = useState(selectedEvent.endHour)
  const [frequencyType, setFrequencyType] = useState(selectedEvent.frequencyType)
  const [price, setPrice] = useState(selectedEvent.price);
  const [date, setDate] = useState(selectedEvent.date);
  const [paidStatus, setPaidStatus] = useState(selectedEvent.paidStatus)
  const [description, setDescription] = useState(selectedEvent.description)
  const [title, setTitle] = useState(selectedEvent.title)
  const [phoneNumber, setPhoneNumber] = useState(selectedEvent.phoneNumber)
  const [shouldJoinClass, setShouldJoinClass] = useState(selectedEvent.shouldJoinClass);
  const [instructor, setInstructor] = useState(selectedEvent.instructor);
  const [participants, setParticipants] = useState(selectedEvent.participants ? selectedEvent.participants : []);
  const [messageAlert, setMessageAlert] = useState()
  const [showMessageAlert, setShowMessageAlert] = useState(false)
  const [clubCourts, setClubCourts] = useState([])
  const [showConfirmBox, setShowConfirmBox] = useState(false)
  const [clubClass, setClubClass] = useState()

  let loggedUser = useSelector((storeState) => storeState.userModule.loggedUser)
  let uid = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGED_USER)).uid
  const navigate = useNavigate()

  useEffect(() => {
    if (clubCourts.length === 0) {
      courtService.getClubCourts().then(res => {
        setClubCourts(res.data.club_courts.map(court => court.name))
      })
    }
  }, [])

  const theme = createTheme({
    direction: 'rtl',
  })

  // Create rtl cache
  const cacheRtl = createCache({
    key: 'muirtl',
  })

  const isIntersected = (selectedRow, stHr, edHr, instructor) => {
    const START_HOUR_DAY = 6
    if ((selectedRow[hoursDataArr[(stHr-START_HOUR_DAY)*2]] === "" || selectedRow[hoursDataArr[(stHr-START_HOUR_DAY)*2]] === instructor) && (selectedRow[hoursDataArr[((edHr-0.5)-START_HOUR_DAY)*2]] === "" || selectedRow[hoursDataArr[(edHr-START_HOUR_DAY)*2]] === instructor)) {
      return false
    } else if (!(Number(selectedEvent.startHour.split(":")[0]) === stHr && Number(selectedEvent.endHour.split(":")[0]) === edHr)) {
      return true
    }
  }

  const validateEvent = () => {
    const stHr = startHour.split(":")[0]
    const edHr = endHour.split(":")[0]
    if (isIntersected(selectedRow, Number(stHr), Number(edHr), instructor) ) {
      setMessageAlert("ההזמנה היא על שעות של ארוע אחר")
      return false
    }
    if (!stHr && stHr>5 && stHr<24) {
      setMessageAlert("יש למלא שעת התחלה")
      return false
    }
    if (!edHr && edHr>6 && edHr<24) {
      setMessageAlert("יש למלא שעת סיום")
      return false
    }
    if (!(title.trim() !== "" || instructor.trim() !== "")) {
      if (eventType === EventTypes[1]) {
        setMessageAlert("יש למלא מדריך אחד לפחות או את כותרת הארוע")
        return false
      } else {
        setMessageAlert("יש למלא את כותרת הארוע")
        return false
      }
    }
    return true
  }

  const saveClubEvent = async (payload) => {

    if (!loggedUser) {
      navigate('/signin')
    }
    else if (loggedUser || uid) {
      try {
        // TODO validate that event of same date/time doesnt exist
        // let resExists = await eventService.isEventExists(uid, payload)
        // if (!resExists.data.isExists) {
        let res
        if (isEventExists) {
          res = await eventService.editClubEvent(payload)
        } else {
          res = await eventService.addClubEvent(payload)
        }
        if (res.data.result === 0) {
          setMessageAlert("הארוע נשמר בהצלחה")
          closeEditEvent()
        } else {
          setMessageAlert("הארוע לא נשמר בהצלחה")
        }
        setShowMessageAlert(true)
      }
      catch (err) {
        console.log(err)
        // setShowFailureAlert(true)
      }
    }
  }

  const handleSave = (e) => {
    setIsLoading(true)
    e.stopPropagation()
    e.preventDefault()
    if (validateEvent() === true) {
      const payload =   { "dayOfWeek": dayOfWeek.toLowerCase(), eventType, startDate, startHour: startHour, endHour: endHour, frequencyType, courtNumber: selectedEvent.courtNumber,
      price, paidStatus, description, title, phoneNumber, instructor, participants, "clubClass":JSON.stringify(clubClass), shouldJoinClass, "id": selectedEvent.id}
      saveClubEvent(payload)
      updateEventInView(payload)
    } else {
      setShowMessageAlert(true)
      setIsLoading(false)
    }
  }

  const renderIsLoading = () => {
    if (isLoading) {
      return (
        <Loader />
      )
    }
  }

  const handleCloseAlert = (event, reason) => {
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

  const handleSetStartHour = (e) => {
    setStartHour(e.target.value)
  }

  const handleSetEndHour = (e) => {
    setEndHour(e.target.value)
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
            onClose={handleCloseAlert}
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
  const handleDeleteEvent = async () => {
    let res
    // if (!isClubEvent) { // commented since a user event can be deleted only by the user
    //   res = await reservationService.deleteReservation(uid, selectedEvent)
    // } else {
    res = await reservationService.deleteEvent(selectedEvent)
    // }
    if (res.data.result === 0) {
      setMessageAlert("הארוע נמחק")
      closeEditEvent()
    } else {
      setMessageAlert("הארוע לא נמחק")
    }
    setShowMessageAlert(true)
    updateEventInView()
  }
  const renderDeleteEvent = () => {
    if (isEventExists && isClubEvent)
      return (<FontAwesomeIcon className="delete-event" onClick={handleDeleteEvent} icon={faTrashAlt} />)
  }
  const closeConfirmBox = () => {
    setShowConfirmBox(false)
  }
  const handleChangeName = () => {
    setShowConfirmBox(false)
    setTitle(clubClass.title)
  }
  const renderConfirmChange = () => {
    if (showConfirmBox) {
      return (
        <Dialog
            open={showConfirmBox}
            onClose={closeConfirmBox}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {"האם את/ה רוצה לשנות את כותרת הארוע לשם הקורס?"}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeConfirmBox}>לא</Button>
                <Button onClick={handleChangeName} autoFocus>
                    כן
                </Button>
            </DialogActions>
        </Dialog>
    )
    }
  }
  const handleClubClassChange = async (e) => {
    setShowConfirmBox(true)
    setClubClass(e.target.value)
    let res = await courtService.getClubClasses()
    const idx = res.data.club_classes.findIndex(i => i.id === e.target.value.id)
    setParticipants(JSON.parse(res.data.club_classes[idx].participants))
  }
  const renderParticipantsList = () => {
    if (shouldJoinClass)
      return (<ParticipantsList participants={participants} />)
  }
  const renderInstructors = () => {
      return (
        <SelectMenu inputLabel="שם המדריך" defaultValue={instructor} values={tennisInstructors} setValue={setInstructor} />
      )
  }
  return (
    <>
      {renderIsLoading()}
      {renderMessageAlert()}
      {renderConfirmChange()}
      <Modal
        open={openEditEvent}
        onClose={closeEditEvent}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-overlay">
        <Box className="modal-box">
          <Container className="modal-content">
            <Box className="modal-header">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                הזמנה חדשה
              </Typography>
            </Box>
            <Box className="modal-body">


            <Typography className="modal-body-text">
                  יום בשבוע - {dayInHebrew}
                </Typography>
              <EventType eventType={eventType} setEventType={setEventType} shouldJoinClass={shouldJoinClass} setShouldJoinClass={setShouldJoinClass} clubClasses={clubClasses} handleClubClassChange={handleClubClassChange} />
              <EventTime theme={theme} cacheRtl={cacheRtl} startHour={startHour} endHour={endHour} setStartHour={handleSetStartHour} setEndHour={handleSetEndHour} date={date} setDate={setDate} />
              <EventFrequency theme={theme} cacheRtl={cacheRtl} frequencyType={frequencyType} setFrequencyType={setFrequencyType} />
              <Box className="court-details flex-column">
                <Typography className="modal-body-text">
                  מספר המגרש שנבחר - {selectedEvent.courtNumber}
                </Typography>
                <div className="flex align-center" style={{ gap: "0.5rem" }}>
                  {/* <SelectMenu inputLabel="בחר מגרש" defaultValue={selectedCourts} values={clubCourts} setValue={setCourts} /> */}
                  <CourtPrice price={price} setPrice={setPrice} paidStatus={paidStatus} setPaidStatus={setPaidStatus} />
                </div>
              </Box>
              <Box className="flex-row">
                <EventTitle title={title} setTitle={setTitle} />
                <EventDescription description={description} setDescription={setDescription} />
              </Box>
              <Divider variant="middle" style={{ margin: "4.5vh 5vw" }} />
              <div className="flex align-center" style={{ gap: "0.5rem", padding: "unset" }}>
                {renderInstructors()}
                {renderParticipantsList()}
              </div>
              <Divider variant="middle" style={{ margin: "4.5vh 5vw" }} />
              <div className='flex align-center justify-between save-cancel-btn-container'>
                <button disabled={isLoading} onClick={handleSave} className='save-btn'>
                  שמירה
                </button>
                <div className="flex-row">
                  <button disabled={isLoading} onClick={closeEditEvent} className='cancel-btn'>
                    ביטול
                  </button>
                  {renderDeleteEvent()}
                </div>
              </div>
            </Box>
          </Container>
        </Box>
      </Modal>
    </>
  );
}
