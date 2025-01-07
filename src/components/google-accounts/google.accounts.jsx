/* eslint-disable no-undef */
import { userService } from '../../services/user.service.js'

export const setGoogleAccounts = (divId) => {
    google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: userService.handleCredentialResponse
      })

      google.accounts.id.renderButton(document.getElementById(divId), {
        type: "standard",
        theme: "filled_black",
        size: "large",
        text: "כניסה עם גוגל",
        shape: "rectangular",
      })
}