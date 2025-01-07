const initialState = {
    users: [],
    uid: null,
    // watchedUser: null,
    loggedUser: null,
    role: null
}

export function userReducer(state = initialState, action) {
    let newState = state
    switch (action.type) {
        case 'SET_LOGGED_USER':
            newState = { ...state, loggedUser: action.user }
            break
        case 'SET_USER':
            newState = { ...state, loggedUser: action.user }
            break
        case 'REMOVE_USER':
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break
        case 'SET_USERS':
            newState = { ...state, users: action.users }
            break
        case 'SET_USER_UID':
            newState = { ...state, uid: action.uid }
            break
        case 'SET_USER_ROLE':
            newState = { ...state, role: action.role }
            break
        default:
            return state
    }
    // For debug:
    // window.userState = newState
    // console.log('State:', newState)
    return newState
}
