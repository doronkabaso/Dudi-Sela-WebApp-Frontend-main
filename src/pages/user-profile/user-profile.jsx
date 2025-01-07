import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { reservationService } from '../../services/reservation.service.js'
import { STORAGE_KEY_LOGGED_USER } from '../../services/user.service';

export const UserProfile = () => {
    const uid = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGED_USER)).uid
    const email = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGED_USER)).email
    const [cardsCredit, setCardsCredit] = useState([])
    let loggedUser = useSelector((storeState) => storeState.userModule.loggedUser)
    let [userCredit, setUserCredit] = useState()

    const getUserCredit = useCallback( async (uid, userCredit) => {
        if ((loggedUser || uid) && userCredit === undefined) {
            let _userCredit = await reservationService.getCredit(uid)
            setUserCredit(_userCredit.user_credit)
            setCardsCredit(_userCredit.punch_cards)
        }
    }, [])

    useEffect(() => {
      getUserCredit(uid, userCredit)
    })

    const renderCardsCredit = () => {
      if (cardsCredit) {
        return (
          Object.keys(cardsCredit).map((key) => {
            return (
              <button className="card-type-btn flex-column">
                שם כרטיסייה: {key}
                <span>כמות קרדיט: {cardsCredit[key]}</span>
              </button>
            )
          }))
      }
    }

  return (
    <div className='academy-info container flex-column'>
        <article>
              <label>{email}</label>
              <br />
              <label>מספר הזיכויים בשל ביטול הזמנות:</label>
            <> {userCredit} </>
            {renderCardsCredit()}
        </article>
    </div >
  )
}


