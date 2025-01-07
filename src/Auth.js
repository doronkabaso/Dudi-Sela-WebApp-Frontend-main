import React, { useState, useEffect } from 'react'

export const AuthContext = React.createContext()

export const AuthProvider = (({ children }) => {

    const [currentUser] = useState(null)

    useEffect(() => {
        // app.auth().onAuthStateChanged(setCurrentUser)
    }, [])

    return (
        <AuthContext.Provider
            value={{ currentUser }}
        >
            {children}
        </AuthContext.Provider>
    )
})