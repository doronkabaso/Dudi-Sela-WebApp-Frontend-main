const initialState = {
    reservation: null,
    reservations: []
}

export function reservationReducer(state = initialState, action) {
    let reservations
    switch (action.type) {
        case 'SET_RESERVATIONS':
            return { ...state, reservations: action.reservations }
        case 'ADD_RESERVATION':
            reservations = [action.reservation, ...state.reservations]
            return { ...state, reservations }
        case 'REMOVE_RESERVATION':
            reservations = state.reservations.filter(reservation => reservation._id !== action.reservationId)
            return { ...state, reservations }
        case 'GET_BY_ID':
            return { ...state, reservation: action.reservation }
        default:
            return state
    }
}