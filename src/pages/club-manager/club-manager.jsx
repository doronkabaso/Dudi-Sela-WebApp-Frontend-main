import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import Typography from '@mui/material/Typography'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ScheduleDay } from './club-manager/club-components/schedule-day/schedule-day.jsx'
import { getCurrentDate, weekDayInHebrew } from './club-manager/club-components/schedule-day/schedule-helper.js'
import SecondarySideDrawer from './drawers-manager/secondary-side-drawer/secondary-side-drawer.jsx'
import PrimarySideDrawer from "./drawers-manager/primary-drawer/primary-side-drawer.jsx"
import { UsersPermission } from './club-manager/club-components/users-permission/users-permission.jsx'
import { ClubClasses } from './club-manager/club-components/club-classes/club-classes.jsx'
import { AboutClub } from './club-manager/club-components/about-club/about-club.jsx'
import { ClubSettings } from './club-manager/club-components/club-settings/club-settings.jsx'
import { ClubHours } from './club-manager/club-components/club-hours/club-hours.jsx'
import { PunchCards } from './club-manager/club-components/punch-cards/punch-cards.jsx'
import { ClubCourts } from './club-manager/club-components/club-courts/club-courts.jsx'
import { SalesDetails } from './club-manager/club-components/sales-details/sales-details.jsx'
import { primaryDrawerList, secondaryDrawerList, DateFormat, ColorMenu } from './club-manager/club-helper.jsx'
import { courtService } from '../../services/court.service.js'
import { instructorService } from '../../services/instructor.service.js';

export const ClubManager = () => {
  const [date, setDate] = useState(getCurrentDate())
  const [unFormattedDate, setUnFormattedDate] = useState(new Date())
  const [weekDay, setWeekDay] = useState(dayjs().format('dddd'))
  const [showSecondaryDrawer, setShowSecondaryDrawer] = useState(false)
  const [showScheduleManager, setShowScheduleManager] = useState(true)
  const [showClubComponent, setShowClubComponent] = useState(false)
  const [secondaryDrawerTitle, setSecondaryDrawerTitle] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const role = useSelector((storeState) => storeState.userModule.role)
  const [clubClasses, setClubClasses] = useState([])
  const [tennisInstructors, setTennisInstructors] = useState([])

  const getClubClasses = useCallback(async () => {
    let res = await courtService.getClubClasses()
    setClubClasses(res.data.club_classes)
  }, []);

  const getInstructors = useCallback(async () => {
    let instructors = await instructorService.getInstructors()
    setTennisInstructors(instructors)
  }, [setTennisInstructors])

  const getData = useCallback(()=> {
    getInstructors()
    getClubClasses()
  }, [])

  useEffect(() => {
    getData()
  }, [])

  const openTodaysSchedule = () => {
    setUnFormattedDate(new Date())
    let _date = new Date()
    _date.setDate(_date.getDate())
    setDate(dayjs(_date).format(DateFormat))
    setWeekDay(dayjs(_date).format('dddd'))
  }

  const openNextDaySchedule = () => {
    let _date = unFormattedDate
    _date.setDate(_date.getDate() + 1)
    setUnFormattedDate(_date)
    setDate(dayjs(_date).format(DateFormat))
    setWeekDay(dayjs(_date).format('dddd'))
  }

  const openPreviousDaySchedule = () => {
    let _date = unFormattedDate
    _date.setDate(_date.getDate() - 1)
    setUnFormattedDate(_date)
    setDate(dayjs(_date).format(DateFormat))
    setWeekDay(dayjs(_date).format('dddd'))
  }

  const toggleScheduleVsClubInfo = (isShowScheduleManager, isShowClubComponent) => {
    setShowScheduleManager(isShowScheduleManager)
    setShowClubComponent(isShowClubComponent)
  }

  const openClubComponent = (e, title) => {
    setSecondaryDrawerTitle(title)
    toggleScheduleVsClubInfo(false, true)
    setShowSecondaryDrawer(false)
  }

  const openScheduleManager = () => {
    setShowScheduleManager(true)
    setShowClubComponent(false)
  }

  const openSecondaryDrawer = () => {
    setShowSecondaryDrawer(true)
  }

  const logout = () => {
    // dispatch(setUserRole(null))
    // dispatch(setUserUid(null))
    // dispatch(signout())
    navigate('/homepage')
  }

  const mainFuncs = [openScheduleManager, openSecondaryDrawer, logout]

  const renderSecondarySideDrawer = () => {
    if (showSecondaryDrawer) {
      return <SecondarySideDrawer secondaryDrawerList={secondaryDrawerList} openClubComponent={openClubComponent} showSecondaryDrawer={showSecondaryDrawer} setShowSecondaryDrawer={setShowSecondaryDrawer} />
    }
  }

  const renderClubComponent = () => {
    if (showClubComponent) {
      switch (secondaryDrawerTitle) {
        case 'על המועדון':
          return <AboutClub />
        case 'הגדרות מועדון':
          return <ClubSettings />
        case 'שעות פעילות':
          return <ClubHours />
        case 'ניהול מגרשים':
          return <ClubCourts />
        case 'נתוני מכירות':
          return <SalesDetails />
        case 'כרטיסיות וזיכויים':
          return <PunchCards />
        case 'משתמשים והרשאות':
          return <UsersPermission />
        case 'חוגים':
          return <ClubClasses />
        default:
          break;
      }
    }
  }

  const renderColorMenu = () => {
    return (
      ColorMenu.map((item) => {
        return (
          <div className="flex colorIndex">
            <div className="reservationColor" style={{"backgroundColor": item.color}}></div>
            <div className="reservationLabel">{item.label}</div>
          </div>
        )
      })
    )
  }

  const renderScheduleManager = () => {
    if (showScheduleManager) {
      return (
        <>
          <Typography component="h1" variant="h5" style={{ width: "100%", textAlign: "center" }}>האקדמיה לטניס דודי סלע</Typography>
          <ul className="flex align-center justify-between clean-list schedule-header" style={{ marginBlock: "2rem", width: "100%", flex: 1 }}>
            <li style={{ width: "20%" }}><Typography>{weekDayInHebrew[weekDay]} {date}</Typography></li>
            <li>
              <ul className='clean-list flex align-center justify-center' style={{ gap: "1rem" }}>
                <li className="flex-column align-center justify-center schedule-daily-btn"><button className="flex-column align-center justify-center" onClick={openPreviousDaySchedule}><ArrowForwardIosIcon /></button></li>
                <li className="today-btn"><button onClick={openTodaysSchedule}>היום</button></li>
                <li className="flex-column align-center justify-center schedule-daily-btn"><button className="flex-column align-center justify-center" onClick={openNextDaySchedule}><ArrowBackIosIcon /></button></li>
              </ul>
            </li>
            <li className="flex" style={{ width: "20%", justifyContent: "end" }}>
              <img src="https://res.cloudinary.com/primap/image/upload/v1677420672/General/Dudi%20Sela/DudiLogo_wdbxir.svg" className="app-logo"
                alt="logo" />
            </li>
          </ul>
          <ScheduleDay mDate={date} dayOfWeek={weekDay.toLowerCase()} dayInHebrew={weekDayInHebrew[weekDay]} clubClasses={clubClasses} tennisInstructors={tennisInstructors} />
          <div className="color-menu flex-column">
            {renderColorMenu()}
          </div>
        </>
      )
    }
  }

  const renderPriameryDrawer = () => {
    if (role==='admin') {
      return (
        <PrimarySideDrawer primaryDrawerList={primaryDrawerList} mainFuncs={mainFuncs} />
      )
    }
  }

  return (
    <div className="flex-column align-center container manager-container">
      <article className="side-drawer flex">
        {renderSecondarySideDrawer()}
        {renderPriameryDrawer()}
      </article>
      {renderScheduleManager()}
      {renderClubComponent()}
    </div>
  )
}