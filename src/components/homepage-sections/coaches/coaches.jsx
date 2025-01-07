import React from 'react'
import { CoachesPreview } from './coaches-preview/coaches-preview.jsx'

export const Coaches = ({coaches}) => {
  return (
   <>
      <ul className="coaches-list clean-list">
        {coaches.map((coach) =>
          <CoachesPreview
            key={coach.img}
            coach={coach}
          />
        )}
      </ul>
    </>
  )
}