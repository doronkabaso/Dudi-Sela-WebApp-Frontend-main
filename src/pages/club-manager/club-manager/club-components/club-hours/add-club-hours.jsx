import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { SelectMenu } from '../../../../shared-components/select-menu'
import { WeekDays, DayHours, DemoWorkHours, HourConstraint } from '../../club-helper'
// import Button from '@mui/material/Button';

export const AddClubHours = ({handleSaveClubHours}) => {
  const [workHours, setWorkHours] = useState([]);
  const [fromHour, setFromHour] = useState('06:00');
  const [tillHour, setTillHour] = useState('23:00');
  const [validForDays, setValidForDays] = useState([])

  useEffect(() => {
    if (workHours.length === 0)
      DemoWorkHours(setWorkHours)
  }, [workHours.length])

  return (
    <Box className="club-hours-fields-container flex justify-between">
        <SelectMenu multiple={true} inputLabel="ימים" defaultValue={validForDays}    values={WeekDays}  setValue={setValidForDays} />
        <SelectMenu inputLabel="משעה" defaultValue={HourConstraint.hours.startHour} values={DayHours()} setValue={setFromHour} />
        <SelectMenu inputLabel="עד שעה" defaultValue={HourConstraint.hours.endHour} values={DayHours()} setValue={setTillHour} />
        <button className="save-btn" onClick={(e) => handleSaveClubHours(e, {"hours": {"startHour": fromHour, "endHour": tillHour}, "days": validForDays})}>שמור שעות</button>
    </Box>
  )
}