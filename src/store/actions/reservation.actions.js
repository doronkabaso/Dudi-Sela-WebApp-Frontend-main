import { reservationService } from '../../services/reservation.service.js'

export function getActionRemoveReservation(reservationId) {
    return {
        type: 'REMOVE_RESERVATION',
        reservationId
    }
}

export function getActionAddReservation(reservation) {
    return {
        type: 'ADD_RESERVATION',
        reservation
    }
}

let subscriber
export function loadReservations(loggedUser = '') {
    return async (dispatch) => {
        try {
            const reservations = await reservationService.query({ userId: loggedUser._id })
            const action = { type: 'SET_RESERVATIONS', reservations }
            dispatch(action)
        } catch (err) {
            console.error('Error:', err)
        }
        if (subscriber) reservationService.unsubscribe(subscriber)
        subscriber = (ev) => {
            dispatch(ev.data)
        }
        reservationService.subscribe(subscriber)
    }
}

export function getById(reservationId) {
    
    return async dispatch => {
        try {
            const reservation = await reservationService.getById(reservationId)    
            dispatch({
                type: 'GET_BY_ID',
                reservation
            })
        } catch (err) {
            console.error('Error:', err)
        }
    }
}

export function addReservation(reservation) {
    return async dispatch => {
        try {
            await reservationService.save(reservation)
            dispatch(getActionAddReservation(reservation))
        } catch (err) {
            console.error('Error:', err)
        }
        if (subscriber) reservationService.unsubscribe(subscriber)
        subscriber = (ev) => {
            dispatch(ev.data)
        }
        reservationService.subscribe(subscriber)
    }
}
