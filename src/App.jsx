import React from 'react'
import { useEffect } from 'react'
import routes from './routes.js'
import { Routes, Route } from 'react-router'
import { AppHeader } from './components/header-sections/app-header/app-header.jsx'
import { AppFooter } from './components/app-footer/app-footer.jsx'
import { SnackbarProvider } from 'notistack';
import { useDispatch } from 'react-redux'
import { setLoggedUser, setUserUid, setUserRole } from './store/actions/user.actions.js';
import { useNavigate } from "react-router"
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ScrollTop from './components/scroll-top.jsx'
import './main.scss'
import { STORAGE_KEY_LOGGED_USER, auth } from './services/user.service.js'
import { courtService } from './services/court.service.js'

export const App = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   window.addEventListener("storage", async () => {
      dispatch(setLoggedUser())
      const miniUser = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGED_USER))
      const uid = miniUser.uid
      const email = miniUser.email
      const res = await courtService.getUser({"email": email})
      dispatch(setUserUid(uid))
      dispatch(setUserRole(res.data.role))
      navigate('/')
   });

   useEffect(() => {
      if (sessionStorage.getItem('loggedUser')) {
         dispatch(setLoggedUser())
      }
   }, [dispatch])

   return (
      <div className="app-container flex">
         <SnackbarProvider maxSnack={3}>
            <header id="back-to-top-anchor" className="app-header-container">
               <AppHeader />
            </header>

            <main className="routes-container">
               <Routes>
                  {routes.map(route =>
                     <Route key={route.path}
                        exact="true"
                        element={route.component}
                        path={route.path} />)}
               </Routes>
            </main>
            <ScrollTop>
               <Fab color="secondary" size="small" aria-label="scroll back to top">
                  <KeyboardArrowUpIcon />
               </Fab>
            </ScrollTop>
            <footer className="app-footer-container">
               <AppFooter />
            </footer>
         </SnackbarProvider>
      </div>
   )
}

