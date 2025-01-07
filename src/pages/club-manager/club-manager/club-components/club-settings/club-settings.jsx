import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import CustomDivider from '../../../../shared-components/custom-divider';
import { TextBox } from '../../../../shared-components/text-box';
import { SaveButton } from '../../../../shared-components/save-button';
import { SwitchInput } from '../../../../shared-components/switch-input';
import { courtService } from '../../../../../services/court.service'
import Button from '@mui/material/Button';
import { Loader } from '../../../../../components/loader.jsx';

export const ClubSettings = () => {
  const [hrBeforeCancel, setHrBeforeCancel] = useState();
  const [minPerReservation, setMinPerReservation] = useState(60);
  const [daysReservedBefore, setDaysReservedBefore] = useState(7);
  const [phoneCancelReservation, setPhoneCancelReservation] = useState("97523782815");
  const [daysInAdvance, setDaysInAdvance] = useState(7);
  const [cutOffDays, setCutOffDays] = useState("15:00:00");
  const [timeIntervals, setTimeIntervals] = useState("30");
  const [onlineReserve, setOnlineReserve] = useState(true);
  const [memberOnlyClub, setMemberOnlyClub] = useState(false);
  const [addPartnersToAll, setAddPartnersToAll] = useState(false);
  // const [timeIntervals, setTimeIntervals] = useState("15:00:00");
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=> {
    const getClubPreferences = async () => {
      try {
        setIsLoading(true)
        let res = await courtService.getClubPreferences()
        setIsLoading(false)
        return res.data.club_preferences
      } catch (error) {
        navigate('/')
      }
    }
    if (hrBeforeCancel === undefined) {
      getClubPreferences().then(res => {
        setHrBeforeCancel(res.hrBeforeCancel)
        setMinPerReservation(res.minPerReservation)
        setDaysReservedBefore(res.daysReservedBefore)
        setPhoneCancelReservation(res.phoneCancelReservation)
        setDaysInAdvance(res.daysInAdvance)
        setCutOffDays(res.cutOffDays)
        setTimeIntervals(res.timeIntervals)
        setOnlineReserve(res.onlineReserve)
        setMemberOnlyClub(res.memberOnlyClub)
        setAddPartnersToAll(res.addPartnersToAll)
      })
    }
  }, [])

  const handleSave = async (e) => {
    e.stopPropagation()
    e.preventDefault()
    setIsLoading(true)
    const payload = {hrBeforeCancel, minPerReservation, daysReservedBefore, phoneCancelReservation, daysInAdvance, cutOffDays, timeIntervals, onlineReserve, memberOnlyClub, addPartnersToAll}
    let res = await courtService.editClubPreferences(payload)
    setIsLoading(false)
  }
  const renderIsLoading = () => {
    if (isLoading) {
      return (
        <Loader />
      )
    }
  }
  return (
    <Box className="club-setting-box container">
      {renderIsLoading()}
      <div className="club-setting-content">
        <Typography id="club-title" className="club-title" variant="h6" component="h2">הגדרות מועדון</Typography>
        <CustomDivider className="grid-divider" />
        <Box className="main-component-club-setting-fields">
          <TextBox label="זמן בשעות שניתן לבטל לפני מועד הזמנת המגרש" value={hrBeforeCancel} setValue={setHrBeforeCancel} />
          <TextBox label="הזמן הקצר ביותר להזמנה בדקות" disabled={true} value={minPerReservation} setValue={setMinPerReservation} />
          <TextBox label="כמה ימים קדימה אפשר להזמין מראש" disabled={true} value={daysReservedBefore} setValue={setDaysReservedBefore} />
          <TextBox label="מספר טלפון של מנהל ההזמנות" value={phoneCancelReservation} setValue={setPhoneCancelReservation} />
          <TextBox label="days in advance" disabled={true} value={daysInAdvance} setValue={setDaysInAdvance} />
          <TextBox label="cut off days"disabled={true} value={cutOffDays} setValue={setCutOffDays} />
          <TextBox label="מרווחי זמן בדקות" disabled={true} value={timeIntervals} setValue={setTimeIntervals} />
          <Box className="switch-input-container">
            <SwitchInput label="פתוח להזמנות ברשת" disabled={true} value={onlineReserve} setValue={setOnlineReserve} />
            <SwitchInput label="מועדון לחברים בלבד" disabled={true} value={memberOnlyClub} setValue={setMemberOnlyClub} />
            <SwitchInput label="אפשרות להוסיף פרטנרים לכולם" disabled={true} value={addPartnersToAll} setValue={setAddPartnersToAll} />
          </Box>
        </Box>
        {/* <Box className="btn-club-setting-components-container flex align-center"> */}
          <Button className="save-club-setting-btn" variant="contained" component="label" onClick={(e) => handleSave(e)}>שמור</Button>
        {/* </Box> */}
      </div>
    </Box>
  )
}