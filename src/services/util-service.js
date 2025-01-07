export const utilService = {
    makeId,
    makeLoremLarge,
    makeLoremMedium,
    makeLoremSmall,
    getRandomIntInclusive,
    getRandomColor,
    padNum,
    getDayName,
    getMonthName,
    sequenceId,
    getTimeStamp,
    getDateFromStamp,
    createRandEmailAddress,
    setDateTime,
    getMonthNumber,
    getYearNumber,
    getLocalMonthName
}

function setDateTime(userDate) {
    let date = new Date(userDate).toLocaleDateString('he-IL', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })
    date = date.replace('T', ' ')
    date = date.replace('Z', ' ')
    let res = date.substring(0, 11)
    // let res = date.substr(0,19)
    return res
}


function getMonthNumber(userDate) {
    let date = new Date(userDate).toLocaleDateString('he-IL', { month: 'numeric'})
    date = date.replace('T', ' ')
    date = date.replace('Z', ' ')
    let res = date.substring(5, 2)
    // let res = date.substr(0,19)
    return +res
}

function getYearNumber(userDate) {
    let date = new Date(userDate).toLocaleDateString('he-IL', { year: 'numeric'})
    date = date.replace('T', ' ')
    date = date.replace('Z', ' ')
    let res = date.substring(0, 4)
    // let res = date.substr(0,19)
    return +res
}

function createRandEmailAddress() {
    let chars = 'abcdefghijklmnopqrstuvwxyz1234567890'
    let string = ''
    for (let ii = 0; ii < 15; ii++) {
        string += chars[Math.floor(Math.random() * chars.length)]
    }
    return (string + '@gmail.com')
}

function makeId(length = 4) {
    let txt = ''
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function sequenceId(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

function makeLoremLarge(size = 50) {
    let words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    let txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}
function makeLoremMedium(size = 5) {
    let words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    let txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}
function makeLoremSmall(size = 1) {
    let words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    let txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function padNum(num) {
    return (num > 9) ? num + '' : '0' + num
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

// getDayName('12/25/2021', 'he') ->  'יום שבת'
function getDayName(date, locale) {
    date = new Date(date)
    return date.toLocaleDateString(locale, { weekday: 'long' })
}


function getMonthName(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    return monthNames[date.getMonth()]
}

function getLocalMonthName(date) {
    const monthNames = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
        "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
    ]
    return monthNames[date.getMonth()]
}

function getTimeStamp(timeStamp) {
    // Create a new JavaScript Date object based on the timeStamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(timeStamp)
    // Hours part from the timestamp
    let hours = date.getHours()
    // Minutes part from the timestamp
    let minutes = '0' + date.getMinutes()
    // Seconds part from the timestamp
    let formattedTime = hours + ':' + minutes.substr(-2)
    return formattedTime
}

function getDateFromStamp(timeStamp) {
    let date = new Date(timeStamp * 1000)
    let year = date.getFullYear()
    let month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    let formattedDate = `${year}-${month}-${day}`
    return formattedDate
}