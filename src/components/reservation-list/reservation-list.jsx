
import React, { useState, useEffect } from 'react'
import { ReservationPreview } from '../reservation-preview/reservation-preview.jsx'
import { DateFormat } from '../../pages/club-manager/club-manager/club-helper.jsx'
import dayjs from 'dayjs';
import { courtService } from '../../services/court.service.js';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { reservationService } from "../../services/reservation.service"
import { useSelector } from "react-redux"
import { STORAGE_KEY_LOGGED_USER } from '../../services/user.service';
import { useNavigate } from "react-router"

export const ReservationList = ({ reservations }) => {
    const todaysDate = dayjs().format(DateFormat)
    const [sorting, setSorting] = useState({ field: 'date', ascending: false })
    const [currentReservations, setCurrentReservations] = useState(reservations)
    const [hrBeforeCancel, setHrBeforeCancel] = useState();
    const [showDeleteAlert, setShowDeleteAlert] = useState(false)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showFailureAlert, setShowFailureAlert] = useState(false)
    const [selectedReservation, setSelectedReservation] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    let uid = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGED_USER)).uid
    let loggedUser = useSelector((storeState) => storeState.userModule.loggedUser)

    const applySorting = (e, key, ascending) => {
        e.preventDefault();
        e.stopPropagation();
        setSorting({ key: key, ascending: ascending });
    }

    useEffect(() => {
        // Copy array to prevent data mutation
        const currentReservationsCopy = [...currentReservations];

        // Apply sorting
        const sortedCurrentReservations = currentReservationsCopy.sort((a, b) => {
            return a[sorting.key].localeCompare(b[sorting.key]);
        });

        // Replace currentUsers with sorted currentUsers
        setCurrentReservations(
            // Decide either currentUsers sorted by ascending or descending order
            sorting.ascending ? sortedCurrentReservations : sortedCurrentReservations.reverse()
        );
    }, []);
    useEffect(()=> {
        const getClubPreferences = async () => {
            let res = await courtService.getClubPreferences()
            return res.data.club_preferences
        }
        if (hrBeforeCancel === undefined) {
          getClubPreferences().then(res => {
            setHrBeforeCancel(res.hrBeforeCancel)
          });
        }
      }, [])

    const onDeleteReservation = async (e, item) => {
        setShowDeleteAlert(true)
        setSelectedReservation(item)
    }

    const closeDeleteAlert = () => {
        setShowDeleteAlert(false);
    }

    const handleDeleteReservation = async () => {
        if (!loggedUser) {
            navigate('/signin')
        }
        if (loggedUser) {
            setIsLoading(true);
            const payload = selectedReservation
            const res = await reservationService.deleteReservation(uid, payload)
            const creditNum = payload.endHour.split(":")[0] - payload.startHour.split(":")[0]
            const resCredit = await reservationService.changeCredit(uid, { "userCredit": creditNum, "mail": loggedUser.email, "date": todaysDate, "cardName": ''})
            setShowDeleteAlert(false)
            if (res.data.result === 0 && resCredit.data.result === 0) {
                setShowSuccessAlert(true)
            } else {
                setShowSuccessAlert(false)
            }
            setIsLoading(false);
        }
    }

    const handleCloseAlert = (event, reason) => {
        setShowSuccessAlert(false)
        setShowFailureAlert(false)
        setIsLoading(false);
        navigate('/')
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
      const renderSuccessAlert = () => {
        if (showSuccessAlert) {
            return (
                <Snackbar
                    open={true}
                    autoHideDuration={60000}
                    onClose={handleCloseAlert}
                    action={alertAction}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert
                        severity="success"
                        onClose={handleCloseAlert}
                        sx={{
                            minWidth: '100%',
                            color: '#1d1d1d',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '10px',
                            backgroundColor: '#C9DB39'
                        }}
                        spacing={5}
                        variant="filled"
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        המגרש בוטל בהצלחה, הכרטיסיה זוכתה בהזמנה של מגרש (מידע בפרופיל האישי) </Alert>
                </Snackbar>
            )
        }
    }

    const renderFailureAlert = () => {
        if (showFailureAlert) {
            return (
                <Snackbar
                    open={true}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    autoHideDuration={6000}
                    onClose={handleCloseAlert}
                    action={alertAction}
                >
                    <Alert
                        severity="error"
                        onClose={handleCloseAlert}
                        sx={{
                            minWidth: '100%',
                            color: '#fff',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '10px',
                            backgroundColor: '#dc0000'
                        }}
                        spacing={5}
                        // margin={5}
                        variant="filled"
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        ביטול המגרש נכשל</Alert>
                </Snackbar>
            )
        }
    }

    const renderDeleteAlert = () => {
        return (
            <Dialog
                open={showDeleteAlert}
                onClose={closeDeleteAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"ביטול הזמנה"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {" האם את/ה בטוח/ה שברצונך לבטל את ההזמנה?"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteAlert}>לא</Button>
                    <Button onClick={handleDeleteReservation} autoFocus>
                        כן
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
    return (
        <section className="list-of-reservations-container">
            {renderDeleteAlert()}
            {renderSuccessAlert()}
            {renderFailureAlert()}
            <table className="reservations-list">
                <thead>
                    <tr>
                        <th className='reservation-th' onClick={(e) => applySorting(e, 'date', !sorting.ascending)}>תאריך</th>
                        <th className='reservation-th'>שעת התחלה</th>
                        <th className='reservation-th'>שעת סיום</th>
                        <th className='reservation-th'>מספר מגרש</th>
                        <th className='reservation-th'>פעולות</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations && reservations.map(item =>
                        <ReservationPreview
                            key={item.id}
                            item={item}
                            todaysDate={todaysDate}
                            hrBeforeCancel={hrBeforeCancel}
                            onDeleteReservation={onDeleteReservation}
                            isLoading={isLoading}
                        />
                    )}
                </tbody>
            </table>
        </section>
    )
}
