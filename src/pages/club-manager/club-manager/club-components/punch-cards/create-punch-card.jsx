import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import CustomDivider from '../../../../shared-components/custom-divider';
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { TextBox } from '../../../../shared-components/text-box';
import { SwitchInput } from '../../../../shared-components/switch-input';
import { SelectMenu } from '../../../../shared-components/select-menu'
import { MemberTypes } from '../../club-helper'
import { AddClubHours } from '../club-hours/add-club-hours'
import { ClubHoursList } from '../club-hours/club-hours-list'
import { courtService } from '../../../../../services/court.service'

export const CreatePunchCard = ({ selectedCard, showModalCreate, closePunchCard, handleSave, handleClose, isLoading, removeSelectedCard }) => {
    const [cardName, setCardName] = useState(selectedCard.cardName)
    const [creditAmount, setCreditAmount] = useState(selectedCard.creditAmount)
    const [creditInMinutes, setCreditInMinutes] = useState(selectedCard.creditInMinutes)
    const [dueNumDays, setDueNumDays] = useState(selectedCard.dueNumDays)
    const [blockOnDate, setBlockOnDate] = useState(selectedCard.blockOnDate)
    const [price, setPrice] = useState(selectedCard.price)
    const [additionalDetails, setAdditionalDetails] = useState(selectedCard.additionalDetails)
    const [showForSale, setShowForSale] = useState(selectedCard.showForSale)
    const [isMember, setIsMember] = useState(selectedCard.isMember)
    const [validForMembers, setValidForMembers] = useState(selectedCard.validForMembers)
    const [clubHoursList, setClubHoursList] = useState(selectedCard.cardHours)

    const navigate = useNavigate()

    useEffect(()=> {
        const getClubHours = async () => {
            try {
            //   setIsLoading(true)
              let res = await courtService.getClubHours()
            //   setIsLoading(false)
              return res.data.club_hours
            } catch (error) {
              navigate('/')
            }
          }
    }, [navigate])

    const handleSaveClubHours = async (e, clubHours) => {
      const _clubHours = JSON.parse(JSON.stringify(clubHoursList))
      _clubHours.push(clubHours)
      setClubHoursList(_clubHours)
    }

    const handleDeleteClubHour = async(e, index) => {
      const _clubHours = JSON.parse(JSON.stringify(clubHoursList))
      _clubHours.splice(index, 1)
      setClubHoursList(_clubHours)
    }

    const handleEditClubHours = async (e, clubHours) => {
      console.log(clubHours)
    }

    return (
        <Modal
            open={showModalCreate}
            onClose={closePunchCard}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="modal-overlay">
            <Box className="modal-box">
                <Container className="modal-content">
                    <Box className="modal-header">
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            כרטיסיה
                        </Typography>
                    </Box>
                    <Box className="modal-body">
                        <TextBox label="שם הכרטיסייה" value={cardName} setValue={setCardName} />
                        <SwitchInput label="מנויים" value={isMember} setValue={setIsMember} />
                        <TextBox label="כמות קרדיט" value={creditAmount} setValue={setCreditAmount} />
                        <TextBox label="זמן כל קרדיט בדקות" value={creditInMinutes} setValue={setCreditInMinutes} />
                        <TextBox label="תוקף בימים" value={dueNumDays} setValue={setDueNumDays} />
                        <TextBox label="לחסום בתאריך" value={blockOnDate} setValue={setBlockOnDate} />
                        <TextBox label="מחיר" value={price} setValue={setPrice} />
                        <TextBox label="מידע נוסף" value={additionalDetails} setValue={setAdditionalDetails} />
                        <SwitchInput label="להציג למכירה" value={showForSale} setValue={setShowForSale} />
                        <SelectMenu inputLabel="תקף עבור" defaultValue={validForMembers} values={MemberTypes} setValue={setValidForMembers} />

                        <CustomDivider className="grid-divider" />
                        <Box className="club-hours-instructions">
                            <span>שעות הפעילות</span>
                        </Box>
                        <CustomDivider className="grid-divider" />
                        <AddClubHours handleSaveClubHours={handleSaveClubHours}/>
                        <Divider variant="middle" style={{ margin: "4.5vh 5vw" }} />
                        {/* <Box className="club-hours-instructions">
                            <span>תקפות הכרטיסייה</span>
                        </Box> */}
                        <ClubHoursList clubHoursList={clubHoursList} handleSaveClubHours={handleSaveClubHours} handleDeleteClubHour={handleDeleteClubHour} handleEditClubHours={handleEditClubHours}/>
                        <Divider variant="middle" style={{ margin: "4.5vh 5vw" }} />
                        <div className='flex align-center justify-between save-cancel-btn-container'>
                            <button disabled={isLoading} onClick={(e) => handleSave(e, {cardName, creditAmount, creditInMinutes, dueNumDays, blockOnDate, price, additionalDetails, showForSale, validForMembers, cardHours: clubHoursList })} className='save-btn' style={{whiteSpace: "nowarp"}}>
                                שמור כרטיסיה
                            </button>
                            <button onClick={handleClose} className='cancel-btn'>
                                ביטול
                            </button>
                        </div>
                    </Box>
                </Container>
            </Box>
        </Modal>
    )
}