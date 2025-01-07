import dayjs from 'dayjs'

export const WeekDays = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]

export const CourtNames = ["מגרש 1", "מגרש 2", "מגרש 3", "מגרש 4", "מגרש 5", "מגרש 6", "כחול מוזל", "אדום מוזל", "ירוק מוזל"]

export const TypeGames = ["טניס", "מיני טניס", "פאדל", "פיקלבול", "טניס חימר", "כדורסל", "כדורגל", "טניס קשה מקורה", "מגרש טניס מוזל", "טניס חופים", "דשא סינטטי"]

export const MemberTypes = ["כל החברים", "מנהל", "סטודנט\\חייל", "מאמן"]

export const DayHours = () => {
  const hours = []
  for (let i = 0; i <= 24; i++) {
    if (i < 10) {
      hours.push("0" + i + ":00")
    } else {
      hours.push(i + ":00")
    }
  }
  return hours
}

export const DemoWorkHours = (setWorkHours) => {
  const hours1 = { days: ["ראשון", "שני", "שלישי", "רביעי", "חמישי"], hours: { startHour: "06:00", endHour: "24:00" } }
  const hours2 = { days: ["שישי"], hours: { startHour: "06:00", endHour: "23:00" } }
  const hours3 = { days: ["שבת"], hours: { startHour: "06:00", endHour: "23:00" } }
  setWorkHours([hours1, hours2, hours3])
}

export const DemoConstraintsData = [{ days: ["ראשון", "שני", "שלישי", "רביעי", "חמישי"], hours: { startHour: "06:00", endHour: "24:00" }, memberType: MemberTypes[0], price: 80 },
{ days: ["שישי", "שבת"], hours: { startHour: "06:00", endHour: "21:00" }, memberType: MemberTypes[0], price: 80 },
{ days: ["שישי", "שבת"], hours: { startHour: "21:00", endHour: "23:00" }, memberType: MemberTypes[1], price: 60 }]
export const HourConstraint = { days: [], hours: { startHour: '06:00', endHour: '23:00' }, memberType: MemberTypes[0], price: 0 }

export const DemoPunchCards = [{ cardName: "בוקר אטרקטיבי", isMember: false, creditAmount: 11, creditInMinutes: 60, dueNumDays: 365, blockOnDate: 'ללא הגבלה', price: 550, showForSale: true, validForMembers: ["פתוח לכולם"],
additionalDetails: 'כרטיסיית יום סופר משתלמת לשימוש בכל ימות השבוע פרט לשישישבת.בתוקף לשנה מיום הרכישה.מאמנים לא יורשו לעלות למגרש עם שימוש בכרטיסיה זו .', validDateTime: { days: ["ראשון", "שני", "שלישי", "רביעי", "חמישי"], hours: { startHour: "06:00", endHour: "24:00" } } },
{ cardName: "סופר דיל 10 + 1", isMember: false, creditAmount: 11, creditInMinutes: 60, dueNumDays: 365, blockOnDate: 'ללא הגבלה', price: 700, showForSale: true, validForMembers: ["פתוח לכולם"], additionalDetails: 'כרטיסיית יום סופר משתלמת לשימוש בכל ימות השבוע פרט לשישישבת.בתוקף לשנה מיום הרכישה.מאמנים לא יורשו לעלות למגרש עם שימוש בכרטיסיה זו .', validDateTime: { days: ["ראשון", "שני", "שלישי", "רביעי", "חמישי"], hours: { startHour: "07:00", endHour: "24:00" } } }]

export const primaryDrawerList = [
  {
    title: 'מנהל ההזמנות',
    className: 'schedule-manager',
    icon: 'https://res.cloudinary.com/primap/image/upload/v1679990470/General/Dudi%20Sela/Icons/court-management2_fm4mkt.svg'
  },
  {
    title: 'המועדון',
    className: 'secondary-drawer',
    icon: 'https://res.cloudinary.com/primap/image/upload/v1679990469/General/Dudi%20Sela/Icons/tennis_a5iwfs.svg'
  },
  {
    title: 'יציאה',
    className: 'log-out',
    icon: 'https://res.cloudinary.com/primap/image/upload/v1681245384/sign-out-icon_negt9b.svg'
  }
]

export const secondaryDrawerList = [
  {
    title: 'על המועדון',
    icon: 'https://res.cloudinary.com/primap/image/upload/v1679990471/General/Dudi%20Sela/Icons/tennis_a5iwfs.svg'
  },
  {
    title: 'הגדרות מועדון',
    icon: 'https://res.cloudinary.com/primap/image/upload/v1679990469/General/Dudi%20Sela/Icons/club-setting_kpkhkk.svg'
  },
  {
    title: 'שעות פעילות',
    icon: 'https://res.cloudinary.com/primap/image/upload/v1679990469/General/Dudi%20Sela/Icons/hours_d6kik7.svg'
  },
  {
    title: 'ניהול מגרשים',
    icon: 'https://res.cloudinary.com/primap/image/upload/v1679990470/General/Dudi%20Sela/Icons/court-management2_fm4mkt.svg'
  },
  // {
  //   title: 'נתוני מכירות',
  //   icon: 'https://res.cloudinary.com/primap/image/upload/v1679990470/General/Dudi%20Sela/Icons/sales-data_hulrat.svg'
  // },
  {
    title: 'כרטיסיות וזיכויים',
    icon: 'https://res.cloudinary.com/primap/image/upload/v1679990469/General/Dudi%20Sela/Icons/punch-card_pfrcqo.svg'
  },
  {
    title: 'משתמשים והרשאות',
    icon: 'https://res.cloudinary.com/primap/image/upload/v1679990471/General/Dudi%20Sela/Icons/user-perm_qhbx53.svg'
  },
  {
    title: 'חוגים',
    className: 'club-classes',
    icon: 'https://res.cloudinary.com/primap/image/upload/v1681245209/classes-icon_lje2ds.svg'
  },
]

export const DemoClubUsers = [
  { fullName: "יואב בן צבי", role: MemberTypes[1], validTill: true, firstName: "יואב", dateOfBirth: "16/12/1985",
    lastName: "בן צבי", nickname: "test", id: "1234234234", primaryPhone: "97234234234", contactPhone: "97223423423", email: "asdfsd@gmail.com",
    additionalPhone: "97223123312", city: "Tel Aviv", fullAddress: "hashmonaim", clientComments: "", isInstructor: true, instructorDetails: "test2"
  },
  { fullName: "גיל מזור", role: MemberTypes[1], validTill: true, firstName: "גיל", dateOfBirth: "16/12/1985",
  lastName: "מזור", nickname: "test", id: "1234234231", primaryPhone: "97234234231", contactPhone: "97223423423", email: "asdfsd@gmail.com",
  additionalPhone: "97223123312", city: "Tel Aviv", fullAddress: "hashmonaim", clientComments: "", isInstructor: true, instructorDetails: "test2"
},
{ fullName: "שרון בלו", role: MemberTypes[1], validTill: true, firstName: "שרון", dateOfBirth: "16/12/1985",
    lastName: "בלו", nickname: "test", id: "1234234232", primaryPhone: "97234234232", contactPhone: "97223423423", email: "asdfsd@gmail.com",
    additionalPhone: "97223123312", city: "Tel Aviv", fullAddress: "hashmonaim", clientComments: "", isInstructor: true, instructorDetails: "test2"
}
]

export const DemoClubCourses = [
  { title: "אוניברסיטה", type: "tennis", instructorName: "רוני ליאור", description: "כדור מלא ילדים X"},
  { title: "ילדים", type: "tennis", instructorName: "דורון", description: "כדור מלא ילדים"}
]

export const DemoInstructors = ["תומר צירקין","אור","יואב בן צבי","יוני","דודי סלע"]

export const EventTypes = ["הזמנה חיצונית", "הזמנה פנימית", "לא זמין"]

export const FrequencyTypes = ["חד פעמי", "שבועי"]

export const PaymentStatus = ["לא שולם","שולם"]

export const DemoClubEvents = [
  { eventType: EventTypes[0], startDate: "16/7/2023", hours: { startHour: "06:00", endHour: "21:00" }, frequencyType: PaymentStatus[0], courts: ["מגרש 1", "מגרש 2"],
  price: 100, paidStatus: PaymentStatus[0], description: "test", title: "title", phoneNumber: "97223423423", instructor: "תומר", participants: ["קדם קבסו"]
  }
]

export const DateFormat = 'YYYY-MM-DD'

// export const EmptyEvent = { dayOfWeek, eventType, startDate, startHour, endHour, frequencyType, courtNumber,
// price, paidStatus, description, title, phoneNumber, instructor, participants}

export const EmptyEvent = { "dayOfWeek": "", "eventType": EventTypes[1], "startDate": dayjs(new Date()).format(DateFormat), "startHour": "", "endHour": "", "frequencyType":FrequencyTypes[1], "courtNumber":"",
      "price": "", "paidStatus":PaymentStatus[0], "description": "", "title":"", "phoneNumber": "", "instructor": "", "participants": [], "shouldJoinClass": false}

export const EmptyCourse = { "title": "", "tennisInstructor": "", "description": "", "participants": []}

export const UserRoles = ['subscriber', 'student', 'instructor', 'manager', 'admin']

export const ToLocaleIsrael = (_date) => {
  return _date.toLocaleDateString('he-IL', {timeZone:'Asia/Jerusalem'}).replace(/\D/g,'/')
}

export const ColorMenu = [{"label": "הזמנה חיצונית", "color": "#ADD8E6"}, {"label": "הזמנה פנימית", "color": "#90EE90"}, {"label": "הזמנה פרטית", "color": "#e495d9"}, {"label": "לא זמין", "color": "lightgrey"} ]