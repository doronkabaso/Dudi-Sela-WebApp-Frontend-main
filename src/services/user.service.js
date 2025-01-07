import { httpService } from './http.service.js'
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from 'firebase/app'
import getFirebaseConfig from './firebase.js';
import { courtService } from './court.service.js';
export const STORAGE_KEY_LOGGED_USER = 'loggedUser'
export const ACCESS_TOKEN = 'accessToken'

export const userService = {
    login,
    authSignout,
    signup,
    getLoggedUser,
    handleCredentialResponse
}

window.userService = userService

async function login(userCred, role='subscriber') {
    try {
        const loggedUser = await httpService.post('signin', userCred, role)
        if (loggedUser) {
            sessionStorage.setItem("accessToken", loggedUser["data"]["stsTokenManager"]["accessToken"])
            _handleLogin(loggedUser.data)
            return loggedUser
        }
    } catch (err) {
        throw err
    }
}

async function signup(mailAndPswd, payload,  role='subscriber') {
    try {
        const user = await httpService.post('signup', mailAndPswd, role)
        _handleLogin(mailAndPswd)
        return user
    } catch (err) {
        alert(err.message)
        throw err
    }
}

async function authSignout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGED_USER)
    sessionStorage.removeItem(ACCESS_TOKEN)
    return await httpService.post('signout', {}, 'subscriber')
}

function _handleLogin(user) {
    if (user.uid) {
        const miniUser = { email: user.email, uid: user.uid}
        sessionStorage.setItem(STORAGE_KEY_LOGGED_USER, JSON.stringify(miniUser))
        window.dispatchEvent(new Event("storage"));
    }
}

function getLoggedUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGED_USER))
}

export const auth = getAuth(initializeApp(getFirebaseConfig()))

function handleCredentialResponse(response) {
    const idToken = response.credential;
    const credential = GoogleAuthProvider.credential(idToken);

    signInWithCredential(auth, credential)
        .then((res) => {
            _handleLogin(res.user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.error(errorCode, errorMessage, errorMessage, email, credential);
        })
}


