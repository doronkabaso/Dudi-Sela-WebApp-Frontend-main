import dayjs from "dayjs"
import { DateFormat, FrequencyTypes, EventTypes } from '../../club-helper'

export const getCurrentDate = () => {
    return dayjs(new Date()).format(DateFormat)
}

export const getRows = (courtNumbers) => {
    const _rows = []
    if (courtNumbers) {
      for (let i = 1; i <= courtNumbers.length; i++) {
        _rows.push({
          id: i,
          courtNumber: i,
          sixAM: "",
          sixThirtyAM: "",
          sevenAM: "",
          sevenThirtyAM: "",
          eightAM: "",
          eightThirtyAM: "",
          nineAM: "",
          nineThirtyAM: "",
          tenAM: "",
          tenThirtyAM: "",
          elevenAM: "",
          elevenThirtyAM: "",
          twelveAM: "",
          twelveThirtyAM: "",
          onePM: "",
          oneThirtyPM: "",
          twoPM: "",
          twoThirtyPM: "",
          threePM: "",
          threeThirtyPM: "",
          fourPM: "",
          fourThirtyPM: "",
          fivePM: "",
          fiveThirtyPM: "",
          sixPM: "",
          sixThirtyPM: "",
          sevenPM: "",
          sevenThirtyPM: "",
          eightPM: "",
          eightThirtyPM: "",
          ninePM: "",
          nineThirtyPM: "",
          tenPM: "",
          tenThirtyPM: "",
          elevenPM: "",
          elevenThirtyPM: ""
        })
      }
    }
    return _rows;
}

export const hoursData = {sixAM:6, sixThirtyAM:6, sevenAM: 7, sevenThirtyAM: 7, eightAM: 8, eightThirtyAM: 8, nineAM:9, nineThirtyAM:9, tenAM:10, tenThirtyAM:10, elevenAM:11, elevenThirtyAM:11, twelveAM:12, twelveThirtyAM:12, onePM: 13, oneThirtyPM: 13, twoPM: 14, twoThirtyPM: 14, threePM: 15, threeThirtyPM: 15, fourPM: 16, fourThirtyPM: 16, fivePM: 17, fiveThirtyPM: 17, sixPM: 18, sixThirtyPM: 18, sevenPM: 19, sevenThirtyPM: 19, eightPM: 20, eightThirtyPM: 20, ninePM: 21, nineThirtyPM: 21, tenPM: 22, tenThirtyPM: 22, elevenPM: 23, elevenThirtyPM: 23};
export const hoursDataArr = ['sixAM', 'sixThirtyAM', 'sevenAM', 'sevenThirtyAM', 'eightAM', 'eightThirtyAM', 'nineAM', 'nineThirtyAM', 'tenAM', 'tenThirtyAM', 'elevenAM', 'elevenThirtyAM', 'twelveAM', 'twelveThirtyAM', 'onePM', 'oneThirtyPM', 'twoPM', 'twoThirtyPM', 'threePM', 'threeThirtyPM', 'fourPM', 'fourThirtyPM', 'fivePM', 'fiveThirtyPM', 'sixPM', 'sixThirtyPM', 'sevenPM', 'sevenThirtyPM', 'eightPM', 'eightThirtyPM', 'ninePM', 'nineThirtyPM', 'tenPM', 'tenThirtyPM', 'elevenPM', 'elevenThirtyPM']
export const columnsData = [{hour: 'courtNumber', headerName:'מספר מגרש'},{hour: 'sixAM', headerName:'6:00'},{hour: 'sixThirtyAM', headerName:'6:30'},
  {hour: 'sevenAM', headerName:'7:00'},{hour: 'sevenThirtyAM', headerName:'7:30'},{hour: 'eightAM', headerName:'8:00'},{hour: 'eightThirtyAM', headerName:'8:30'},
  {hour: 'nineAM', headerName:'9:00'},{hour: 'nineThirtyAM', headerName:'9:30'},{hour: 'tenAM', headerName:'10:00'},{hour: 'tenThirtyAM', headerName:'10:30'},
  {hour: 'elevenAM', headerName:'11:00'},{hour: 'elevenThirtyAM', headerName:'11:30'},{hour: 'twelveAM', headerName:'12:00'},{hour: 'twelveThirtyAM', headerName:'12:30'},
  {hour: 'onePM', headerName:'13:00'},{hour: 'oneThirtyPM', headerName:'13:30'},
  {hour: 'twoPM', headerName:'14:00'},{hour: 'twoThirtyPM', headerName:'14:30'},
  {hour: 'threePM', headerName:'15:00'},{hour: 'threeThirtyPM', headerName:'15:30'},
  {hour: 'fourPM', headerName:'16:00'},{hour: 'fourThirtyPM', headerName:'16:30'},
  {hour: 'fiveThirtyPM', headerName:'17:30'},{hour: 'sixPM', headerName:'18:00'},{hour: 'sixThirtyPM', headerName:'18:30'},
  {hour: 'sevenPM', headerName:'19:00'},{hour: 'sevenThirtyPM', headerName:'19:30'},{hour: 'eightPM', headerName:'20:00'},
  {hour: 'eightThirtyPM', headerName:'20:30'},{hour: 'ninePM', headerName:'21:00'},{hour: 'nineThirtyPM', headerName:'21:30'},{hour: 'tenPM', headerName:'22:00'},
  {hour: 'tenThirtyPM', headerName:'22:30'},{hour: 'elevenPM', headerName:'23:00'},{hour: 'elevenThirtyPM', headerName:'23:30'}]
export const weekDayInHebrew = {'Sunday':"יום ראשון",'Monday':"יום שני",'Tuesday':"יום שלישי",'Wednesday':"יום רביעי",'Thursday':"יום חמישי",'Friday':"יום שישי",'Saturday':"יום שבת"}
export const weekDayLowerCase = {'sunday':"ראשון",'monday':"שני",'tuesday':"שלישי",'wednesday':"רביעי",'thursday':"חמישי",'friday':"שישי",'saturday':"שבת"}

const mockScheduleDay = []
for (let courtNumber = 1; courtNumber < 7; courtNumber++) {
  for (let startHour = 8; startHour < 22; startHour++) {
    mockScheduleDay.push({
        "courtNumber": courtNumber,
        "startHour": startHour,
        "endHour": startHour+1,
        "username": "אקדמיה"
    })
  }
}

const scheduleData = {
  "sunday": mockScheduleDay,
  "monday": mockScheduleDay,
  "tuesday": mockScheduleDay,
  "wednesday": mockScheduleDay,
  "thursday": mockScheduleDay,
  "friday": mockScheduleDay,
  "saturday":mockScheduleDay
}

if (sessionStorage.getItem(process.env.REACT_APP_GOOGLE_CLIENT_ID)) {
  sessionStorage.setItem("dudi-sela-schedule", JSON.stringify(scheduleData))
}

export const getTbColumns = (columnsData) => {
  const _columns = [];
  columnsData.forEach(col => {
    _columns.push({
      field: col.hour,
      headerName: col.headerName,
      type: 'singleSelect',
      headerAlign: 'center',
      width: 140,
    })
  })
  return _columns;
}

export const fillEventSlots = (_rows, reservation, START_HOUR_DAY, _types) => {
  const hrStart = reservation.startHour.split(":")[0]
  const minStart = reservation.startHour.split(":")[1] === "30" ? 0.5 : 0
  const hrEnd = reservation.endHour.split(":")[0]
  const minEnd = reservation.endHour.split(":")[1] === "30" ? 0.5 : 0
  let startHourTxt
  let numTimeSlots = (Number(hrEnd)+Number(minEnd)) - (Number(hrStart) + Number(minStart))
  numTimeSlots*=2
  for (let i = 0; i < numTimeSlots; i++) {
    startHourTxt = hoursDataArr[(Number(hrStart) + Number(minStart))*2 - START_HOUR_DAY*2 +i]
    if (_rows[reservation.courtNumber - 1]!==undefined && _rows[reservation.courtNumber - 1][startHourTxt]!==undefined) {
      if (reservation.instructor) {
        _rows[reservation.courtNumber - 1][startHourTxt] = reservation.instructor
      } else if (reservation.username) {
        _rows[reservation.courtNumber - 1][startHourTxt] = reservation.username
      } else {
        _rows[reservation.courtNumber - 1][startHourTxt] = reservation.title
      }
      switch (reservation.eventType) {
        case EventTypes[0]:
          _types[reservation.courtNumber - 1][startHourTxt] = 'outsider-event'
          break;
        case EventTypes[1]:
          _types[reservation.courtNumber - 1][startHourTxt] = 'insider-event'
          break;
        case EventTypes[2]:
          _types[reservation.courtNumber - 1][startHourTxt] = 'not-available-event'
          break;
        default:
          _types[reservation.courtNumber - 1][startHourTxt] = 'subscriber-event'
          break;
      }
    }
  }
}

export const updateTypesEvents = (types, courtNumbers) => {
  for (let i = 0; i < courtNumbers.length; i++) {
    let elements = document.querySelector(`[data-rowindex="${i}"]`)
    if (elements && elements.children.length>0) {
      const els = Array.prototype.slice.call(elements.children)
      els.forEach(el => {
          const hr = el.getAttribute('data-field')
          el.classList.remove('outsider-event')
          el.classList.remove('insider-event')
          el.classList.remove('not-available-event')
          el.classList.remove('subscriber-event')
          types[i][hr]!=="" && el.classList.add(types[i][hr])
      })
    }
  }
}