import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { TextBox } from '../../../../shared-components/text-box';
import { SelectMenu } from '../../../../shared-components/select-menu'
import { DemoInstructors } from '../../club-helper'
import { instructorService } from '../../../../../services/instructor.service';
import { ParticipantsList } from '../../../../edit-event/participants-list';
import { InputBox } from '../../../../shared-components/input-box';
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert'
import { Autocomplete, TextField } from '@mui/material';

export const CreateClubCourse = ({ selectedCourse, showModalCreate, closeClubCourse, setShowModalCreate, handleSave, classParticipants, setClassParticipants, setIsNewClass, isNewClass }) => {
    const [description, setDescription] = useState(selectedCourse.title)
    const [idCourse] = useState(selectedCourse.id)
    const [instructorName, setInstructorName] = useState(selectedCourse.tennisInstructor)
    const [courseDescription, setCourseDescription] = useState(selectedCourse.description)
    const [tennisInstructors, setTennisInstructors] = useState([])
    const [isDisabled, setIsDisabled] = useState(false)
    const [participants, setParticipants] = useState(!isNewClass ? JSON.parse(selectedCourse.participants) : []);
    const [messageAlert, setMessageAlert] = useState()
    const [showMessageAlert, setShowMessageAlert] = useState(false)
    const [searchParticipant, setSearchParticipant] = useState()

    const handleClose = () => {
        setShowModalCreate(false)
        setIsNewClass(false)
    }
    useEffect(() => {
        const getInstructors = async () => {
            let instructors = await instructorService.getInstructors()
            setTennisInstructors(instructors)
        }
        getInstructors()
    }, [])
    const addParticipant = (newParticipant) => {
        const _particpants = [...participants]
        if (!_particpants.includes(newParticipant)) {
          _particpants.push(newParticipant)
          setParticipants(_particpants)
        }
      }
    const submitNewParticpant = (e, value) => {
    if (value.trim() !== "" && !classParticipants.includes(value.trim())) {
        instructorService.addParticipant({"name": value.trim()}).then(res => {
        if (res.data.result === 0) {
            const _particpants = [...participants]
            _particpants.push(value)
            setParticipants(_particpants)

            const _classParticipants = [...classParticipants]
            _classParticipants.push(value)
            setClassParticipants(_classParticipants)
        }
        })
    } else if (classParticipants.includes(value.trim())) {
        setMessageAlert("התלמיד כבר קיים במערכת")
        setShowMessageAlert(true)
    }
    }
    const removeParticipant = (participant) => {
    const _particpants = [...participants]
    if (_particpants.includes(participant)) {
        const index = _particpants.indexOf(participant);
        _particpants.splice(index, 1);
        setParticipants(_particpants)
    }
    }
    const handleOnClick = (e) => {
        setIsDisabled(true)
        handleSave(e, {"title": description, "description":courseDescription, "tennisInstructor": instructorName, participants: JSON.stringify(participants), id: idCourse})
    }

    const handleSetInstructor = (name) => {
        setInstructorName(name)
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
      const handleSelectParticipant = (event) => {
        addParticipant(event.target.value);
    };

    return (
        <>
            {renderMessageAlert()}
            <Modal
                open={showModalCreate}
                onClose={closeClubCourse}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modal-overlay">
                <Box className="modal-box">
                    <Container className="modal-content">
                        <Box className="modal-header">
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                קורס חדש
                            </Typography>
                        </Box>
                        <Box className="modal-body">
                            <TextBox label="כותרת הקורס" value={description} setValue={setDescription} />
                            <SelectMenu inputLabel="שם המדריך" defaultValue={instructorName} value={instructorName} values={tennisInstructors} setValue={handleSetInstructor} />
                            <TextBox label="תיאור הקורס" value={courseDescription} setValue={setCourseDescription} />

                            <Divider variant="middle" style={{ margin: "4.5vh 5vw" }} />
                            <div className="flex align-center" style={{ gap: "0.5rem", padding: "unset" }}>
                                <ParticipantsList participants={participants} setParticipants={setParticipants} />
                                <Autocomplete
                                  disablePortal
                                  id="combo-box-demo"
                                  options={classParticipants}
                                  sx={{ width: 300 }}
                                  renderInput={(params) => <TextField onSelect={handleSelectParticipant} {...params} label="חפש תלמיד" />}
                                />

                                {/* <SelectMenu inputLabel="הוסף תלמיד קיים" values={classParticipants} setValue={addParticipant} /> */}
                                <SelectMenu inputLabel="הסר משתתף" values={participants} setValue={removeParticipant} />
                            </div>
                            <InputBox inputLabel="הכנס תלמיד חדש" handleSubmit={submitNewParticpant}/>
                            <Divider variant="middle" style={{ margin: "4.5vh 5vw" }} />


                            <div className='flex align-center justify-between save-cancel-btn-container'>
                                <button disabled={isDisabled} onClick={handleOnClick} className='save-btn'>
                                    שמור
                                </button>
                                <button onClick={(e) => handleClose(e)} className='cancel-btn'>
                                    ביטול
                                </button>
                            </div>
                        </Box>
                    </Container>
                </Box>
            </Modal>
        </>
    )
}