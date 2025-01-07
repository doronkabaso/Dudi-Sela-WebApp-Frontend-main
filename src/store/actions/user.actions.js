import { userService } from "../../services/user.service.js"

export function loadUsers() {
    return async dispatch => {
        try {
            dispatch({ type: 'LOADING_START' })
            const users = await userService.getUsers()
            dispatch({ type: 'SET_USERS', users })
        } catch (err) {
            console.error('UserActions: err in loadUsers', err)
        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}

export function googleLogin(googleUser) {
    return async (dispatch) => {
        try {
            var loggedGoogleUser = await userService.getGoogleUser(googleUser)
            const action = { type: "SET_USER", user: loggedGoogleUser }
            dispatch(action)
            return loggedGoogleUser
        } catch (err) {
            return false
        }
    }
}

export function removeUser(userId) {
    return async dispatch => {
        try {
            await userService.remove(userId)
            dispatch({ type: 'REMOVE_USER', userId })
        } catch (err) {
            console.error('UserActions: err in removeUser', err)
        }
    }
}

export function login(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
        } catch (err) {
            console.error('Error - cannot login:', err)
            throw err
        }
    }
}

export function signUpGoogle(user) {
    return async (dispatch) => {
        try {
            const userToAdd = await userService.signUpGoogle(user)
            dispatch({
                type: 'SET_USER',
                userToAdd
            })
        } catch (err) {
            console.error('Cannot signup', err)
        }
    }
}

export function signup(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.signup(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
        } catch (err) {
            console.error('Cannot signup', err)
        }
    }
}

export function signout() {
    return async (dispatch) => {
        try {
            dispatch({
                type: 'SET_USER',
                user: null
            })
        } catch (err) {
            console.error('Cannot logout', err)
        }
    }
}

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId)
        return user

    } catch (err) {
        console.error('Cannot load user', err)
    }
}

export function setLoggedUser() {
    return async (dispatch) => {
        try {
            let user = await userService.getLoggedUser()
            dispatch({ type: 'SET_LOGGED_USER', user })
        } catch (err) {
            console.error('Cannot load user', err)
        }
    }
}

export function setUserUid(uid) {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SET_USER_UID', uid })
        } catch (err) {
            console.error('Cannot save uid', err)
        }
    }
}

export function setUserRole(role) {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SET_USER_ROLE', role })
        } catch (err) {
            console.error('Cannot save role', err)
        }
    }
}