import React, { useState, useEffect } from 'react';
import { SaveButton } from '../../../../shared-components/save-button';
import { SelectMenu } from '../../../../shared-components/select-menu'
import { WeekDays, DayHours, DemoWorkHours } from '../../club-helper'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const ClubHoursList = ({clubHoursList, handleSaveClubHour, handleDeleteClubHour, handleEditClubHours, }) => {
  return (
    <div className="club-hr flex-column">
          {clubHoursList && clubHoursList.map((clubHours, index) => (
            <div className="form-fields flex-column">
              <p>{clubHours.days.join(", ")}</p>
              <div className="select-fields flex justify-between">
                <div>
                  <SelectMenu multiple={true} inputLabel="ימים" defaultValue={clubHours.days} values={clubHours.days} setValue={(values) => handleEditClubHours(values, index, "days")} />
                  <SelectMenu defaultValue={clubHours.hours.startHour} inputLabel="משעה" values={DayHours()} setValue={(values) => handleEditClubHours(values, index, "hours", "endHour")} />
                  <SelectMenu defaultValue={clubHours.hours.endHour} inputLabel="עד שעה" values={DayHours()} setValue={(values) => handleEditClubHours(values, index, "hours", "startHour")} />
                </div>
                <div className="club-hours-actions flex align-center">
                  <SaveButton disabled={true} onSave={handleSaveClubHour} />
                  <FontAwesomeIcon onClick={(e) => handleDeleteClubHour(e, index)} icon={faTrashAlt} />
                </div>
              </div>
            </div>
          ))}
    </div>
  )
}