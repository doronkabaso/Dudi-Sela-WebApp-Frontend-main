import { httpService } from './http.service.js'
// import { getActionRemoveReservation } from '../store/actions/reservation.actions.js'

const reservationChannel = new BroadcastChannel('reservationChannel')

export const reservationService = {
    query,
    queryByDate,
    subscribe,
    unsubscribe,
    getById,
    addNewReservation,
    addNewReservationByDate,
    deleteReservation,
    deleteEvent,
    changeCredit,
    getCredit,
    getUsersCredit,
    isReservationExists,
    resetByWeekDay,
    addNewReservationToUser,
    queryByDayofweek,
    postByWeekDay
}

function getById(reservationId) {
    let reservation = httpService.get(`reservation/${reservationId}`)
    return reservation
}

async function query(uid, role='subscriber') {
    try {
        const results = await httpService.post('reservations/userreservations/user', {'uid': uid}, role)
        return results
    } catch (err) {
        throw err
    }
}

async function queryByDate(date, role='subscriber') {
    try {
        let data = await httpService.post('reservations/userreservations/date', {"date": date}, role)
        let reservations
        if (!data) {
            reservations = []
        } else {
            reservations = data.data
        }
        return reservations
    } catch (err) {
        throw err
    }
}

async function queryByDayofweek(dayofweek, role='subscriber') {
    try {
        let data = await httpService.post('reservations/userreservations/dayofweek', {"dayofweek": dayofweek}, role)
        let reservations
        if (!data) {
            reservations = []
        } else {
            reservations = data.data
        }
        return reservations
    } catch (err) {
        throw err
    }
}

async function postByWeekDay(weekday, role='admin') {
    try {
        let res = await httpService.post('reservations/schedule/weekday?weekday=' + weekday, {}, role)
        return res
    } catch (err) {
        throw err
    }
}

async function resetByWeekDay(weekday, role='admin') {
    try {
        let res = await httpService.post('reservations/schedule/reset?weekday=' + weekday, {}, role)
        return res
    } catch (err) {
        throw err
    }
}

async function addNewReservation(data, role='subscriber') {
    try {
        let res = await httpService.post('reservations/addReservation', data, role)
        return res
    }
    catch (err) {
        throw err
    }
}

async function isReservationExists(uid, data, role='subscriber') {
    try {
        let res = await httpService.post('reservations/reservation/exists?docId=' + uid, data, role)
        return res
    }
    catch (err) {
        throw err
    }
}

async function changeCredit(uid, data, role='subscriber') {
    try {
        let res = await httpService.post('reservations/usercredit?docId=' + uid, data, role)
        return res
    }
    catch (err) {
        throw err
    }
}

async function getCredit(uid) {
    try {
        let data = await httpService.get('reservations/usercredit?docId=' + uid)
        return data.data
    } catch (err) {
        throw err
    }
}

async function getUsersCredit(uid) {
    try {
        let data = await httpService.get('reservations/userscredit')
        let users_credit = data.data.users_credit
        return users_credit
    } catch (err) {
        throw err
    }
}

async function deleteReservation(uid, data, role='subscriber') {
    try {
        let res = await httpService.delete('reservations/reservations?docId=' + uid, data, role)
        return res
    }
    catch (err) {
        throw err
    }
}

async function deleteEvent(data, role='admin') {
    try {
        let res = await httpService.delete('reservations/reservations/event', data, role)
        return res
    }
    catch (err) {
        throw err
    }
}

async function addNewReservationToUser(data, role='subscriber') {
    try {
        let res = await httpService.post('reservations/addReservation/user', data, role)
        return res
    }
    catch (err) {
        throw err
    }
}

async function addNewReservationByDate(date, data, role='subscriber') {
    try {
        let res = await httpService.post('reservations/reservations/date?date=' + date, data, role)
        return res
    }
    catch (err) {
        throw err
    }
}

function subscribe(listener) {
    reservationChannel.addEventListener('message', listener)
}

function unsubscribe(listener) {
    reservationChannel.removeEventListener('message', listener)
}
