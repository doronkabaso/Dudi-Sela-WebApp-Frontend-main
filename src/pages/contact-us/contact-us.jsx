import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faWhatsapp, faWaze } from "@fortawesome/free-brands-svg-icons"
import { faPhone } from "@fortawesome/free-solid-svg-icons"
import { NavLink } from 'react-router-dom'
import { courtService } from '../../services/court.service'

export const ContactUs = () => {
  const [phoneCancelReservation, setPhoneCancelReservation] = useState();
  const [phoneNumCancelReservation, setPhoneNumCancelReservation] = useState();
  useEffect(()=> {
    const getClubPreferences = async () => {
      let res = await courtService.getClubPreferences()
      return res.data.club_preferences
    }
    getClubPreferences().then(res => {
      setPhoneCancelReservation("https://wa.me/" + res.phoneCancelReservation)
      setPhoneNumCancelReservation("tel"+res.phoneCancelReservation)
    })
  }, [])
  return (
    <section className="contact-us-container flex-column">
      <div className="main-item flex align-center">
        <div className="contact-us flex-column">
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
            <li><p>כתובתינו:<br />חיים לבנון 60, תל-אביב</p>
              נווטו אלינו ב-<a href='https://ul.waze.com/ul?place=ChIJI-no_m9JHRURWDitqXYq95c&ll=32.11617920%2C34.80226590&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location' target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faWaze} /></a>
            </li>
            <li><NavLink to="/about">על האקדמיה</NavLink></li>

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
      </div>
    </section >
  )
}


