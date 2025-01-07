import React from "react"
import { NavLink } from "react-router-dom"
import { CircleMark } from "../../../services/svg.service.js"

export const DudiInfo = () => {
  return (
    <div className="dudi-info-wrapper container">
      <div className="info-grid">
        <div className="info-text">
          <h2 className="flex">דודי סלע
            <span>
              מחבט מספר אחת בישראל
            </span>
          </h2>
          <ul className="info-points">

            <li className="flex-column">
              <div className="check-mark flex align-center">
                <CircleMark />
                <h6>
                  <span>שחקן גביע דייוויס ואלוף ישראל</span>
                </h6>
              </div>
              <p>שחקן נבחרת ישראל בגביע דייוויס בשנים 2005-2019</p>
              <p>העפלה לחצי גמר גביע דייוויס בשנת 2009</p>
            </li>

            <li className="flex-column">
              <div className="check-mark flex align-center">
                <CircleMark />
                <h6>
                  <strong>מקום שני עולמי במספר זכיות בטורנירי צ'אלנג'ר</strong></h6>
              </div>
              <p>23 תארים בסבב המקצועני ליחידים</p>
              <p>10 תארי סגן ליחידים</p>
              <p>2 תארי סגן בסבב ה-ATP</p>
            </li>

            <li className="flex-column">
              <div className="check-mark flex align-center">
                <CircleMark />
                <h6>
                  <strong>שמונה פעמים אלוף ישראל</strong></h6>
              </div>
              <p>תואר אלוף ישראל לבוגרים בשנים 2006, 2009, 2011, 2013–2017</p>
              <p>מדורג במקום הראשון מ 2016</p>
            </li>

            <li className="flex-column">
              <div className="check-mark flex align-center">
                <CircleMark />
                <h6>
                  <strong>דירוג עולמי - שיא - 29</strong></h6>
              </div>
              <p>שלישי בכל הזמנים בין הישראלים בדירוג לגברים יחידים</p>
            </li>
          </ul>
          <button><NavLink to="/about">
            למידע נוסף
          </NavLink>
          </button>
        </div>
        <div className="dudi-img">
          <img srcSet="https://res.cloudinary.com/primap/image/upload/v1669411761/General/Dudi%20Sela/1380675_10151713936454930_716247100_n_p4lhii.jpg" alt="" />
        </div>
      </div>
    </div >
  )
}


