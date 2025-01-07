import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const HomeHero = () => {
    const { loggedUser } = useSelector((storeState) => storeState.userModule)

    return (
        <div className="hero">
            {/* <VideoPlayer
                className="video"
                // // src={
                // //     "https://res.cloudinary.com/primap/video/upload/v1668944074/General/Dudi%20Sela/hero-video_xpnazb.mp4"
                // // }
                src={
                    "https://res.cloudinary.com/primap/video/upload/v1667564876/General/Dudi%20Sela/pexels-cottonbro-5730331_gtd9q3.mp4"
                }
                autoPlay={true}
                muted={true}
                loop={true}
                height="70vh"
                width="100%"
            /> */}
            <img src="https://res.cloudinary.com/primap/image/upload/v1667564825/General/Dudi%20Sela/kirill-zharkiy-ItKtQ-OaIzQ-unsplash_s8fipb.jpg" className="video" alt='' />
            <div className="hero-text">
                <h1 className="catch-phrase">האקדמיה לטניס<br></br>דודי סלע</h1>
                <p className="catch-phrase">אימון ברמה אחרת</p>

                {!loggedUser ? <button className="open-popup-join">
                    <NavLink to='/signin' rel="nofollow" className="open-popup-login link-page" role="button" tabIndex="0">
                        כניסת משתמשים</NavLink></button> :
                    <button className="open-popup-join">
                        <NavLink to={`/user-reservations/new-reservation`} className="link-page" role="button" tabIndex="0">הזמנת מגרש</NavLink>
                    </button>}
            </div>
            <aside className="hero-stats container">
                <ul className="clean-list flex align-center">
                    <li>
                        מגרשי אימון מקצועיים<br></br>
                        <strong>6 לבוגרים, 3  לילדים</strong>
                    </li>
                    <hr width="1" size="100"></hr>
                    <li>
                        אקדמיה לטניס תחרותי<br></br>
                        <strong>תכניות מותאמות גיל</strong>
                    </li>
                    <hr width="1" size="100"></hr>
                    <li>
                        מאמנים ברמה הגבוהה ביותר<br></br>
                        <strong>צוות בכיר</strong>
                    </li>
                </ul>
            </aside>
        </div>
    )
}
