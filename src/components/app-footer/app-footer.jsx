import React, {useEffect, useState} from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faWhatsapp, faWaze } from "@fortawesome/free-brands-svg-icons"
import { faPhone } from "@fortawesome/free-solid-svg-icons"
import { courtService } from '../../services/court.service'
import { useSelector } from 'react-redux'

export const AppFooter = () => {
  const { pathname } = useLocation()
  const [phoneCancelReservation, setPhoneCancelReservation] = useState();
  const [phoneNumCancelReservation, setPhoneNumCancelReservation] = useState();
  let loggedUser = useSelector((storeState) => storeState.userModule.loggedUser)

  useEffect(()=> {
    if (loggedUser) {
      const getClubPreferences = async () => {
        let res = await courtService.getClubPreferences()
        return res.data.club_preferences
      }
      getClubPreferences().then(res => {
        setPhoneCancelReservation("https://wa.me/" + res.phoneCancelReservation)
        setPhoneNumCancelReservation("tel"+res.phoneCancelReservation)
      })
    }
  }, [])

  return (
    (pathname !== '/manager' && pathname !== '/dashboard') ? (
      <>
        <div className="footer-sections">
          <section className="top-footer container">
            <div className="main-item flex-column">
              <h2 className="title">האקדמיה</h2>
              <ul className="clean-list flex-column">
                <li><p>כתובתינו:<br />חיים לבנון 60, תל-אביב</p>
                  נווטו אלינו ב-<a href='https://ul.waze.com/ul?place=ChIJI-no_m9JHRURWDitqXYq95c&ll=32.11617920%2C34.80226590&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location' target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faWaze} /></a>
                </li>
                {/* <li><NavLink to="/user-reservation/new-reservation">הזמנת מגרשים</NavLink></li> */}
                <li><NavLink to="/about">על האקדמיה</NavLink></li>
              </ul>
            </div>
            <div className="main-item flex-column">
              <h2 className="title">צרו קשר</h2>
              <ul className="clean-list flex-column">
                <li>
                  <a href="mailto:dudiselaacademy@gmail.com">שליחת מייל</a>
                </li>
                <li>
                  <a href={phoneCancelReservation} target="_blank" rel="noreferrer">
                    שליחת הודעה<FontAwesomeIcon icon={faWhatsapp} />
                  </a>
                </li>
                <li>
                  <a href={phoneNumCancelReservation} target="_blank" rel="noreferrer">
                    התקשרו אלינו<FontAwesomeIcon icon={faPhone} /></a>
                </li>

              </ul>
            </div>
            <div className="main-item flex-column">
              <h2 className="title">מדיה חברתית</h2>
              <ul className="clean-list flex-column">
                <li>
                  <a href='https://www.facebook.com/DudiSelaTennisAcademy/' target="_blank" rel="noreferrer">
                    פייסבוק<FontAwesomeIcon icon={faFacebook} />
                  </a>
                </li>
                <li>
                  <a href='https://www.instagram.com/dudiselaacademy/' target="_blank" rel="noreferrer">
                    אינסטגרם<FontAwesomeIcon icon={faInstagram} /></a></li>
              </ul>
            </div>

          </section>

        </div>
        <section className="bottom-footer">
          <ul className="legal-list clean-list flex">
            <li><NavLink to="/">תנאים &amp; הגבלות</NavLink></li>
            <li><NavLink to="/">הצהרת פרטיות</NavLink></li>
            <li>&copy; 2023 Copyright DudiSelaTennisAcademy Inc.</li>
          </ul>
        </section>
      </>
    ) : (
      <span></span>
    )
  )
}

