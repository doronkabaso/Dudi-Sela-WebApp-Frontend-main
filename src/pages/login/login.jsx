/* eslint-disable no-undef */
import * as React from 'react'
import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import { useNavigate, NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login, setLoggedUser, setUserUid, setUserRole } from '../../store/actions/user.actions.js'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { userService } from '../../services/user.service.js'
// import { setGoogleAccounts } from '../../components/google-accounts/google.accounts.jsx'
import { STORAGE_KEY_LOGGED_USER } from '../../services/user.service.js'
import { courtService } from '../../services/court.service.js'
import { Loader } from '../../components/loader.jsx'

export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLogin, setIsLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const theme = createTheme({
    direction: 'rtl',
  })

  const cacheRtl = createCache({
    key: 'muirtl',
  })

  // useEffect(() => {
  //   if (window.google) {
  //     setGoogleAccounts("loginDiv")
  //   }
  // }, []);

  const loginUser = (email, password) => {
    const payload = {
      email,
      password
    }
    userService.login(payload)
      .then(async (response) => {
        if (!response.data.uid) {
          dispatch(setUserUid(null))
          dispatch(setUserRole(null))
          setIsLogin(!isLogin)
          navigate('/signin')
          alert(response.data.message)
        } else {
          const miniUser = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGED_USER)) // { email: user.email, uid: user.uid}
          if (!miniUser) {
            sessionStorage.setItem(STORAGE_KEY_LOGGED_USER, JSON.stringify({ "uid": response.data.uid, "email": email }))
          } else {
            miniUser["uid"] = response.data.uid
            sessionStorage.setItem(STORAGE_KEY_LOGGED_USER, JSON.stringify(miniUser))
          }
          dispatch(setUserUid(response.data.uid))
          const resUser = await courtService.getUser({"email": email})
          dispatch(setUserRole(resUser.data.role))
          setIsLogin(isLogin)
          dispatch(login(payload))
          dispatch(setLoggedUser())
          navigate('/')
        }
      })
      .catch((error) => {
        alert("בעית תקשורת ברשת");
        console.error(error)
      })
  }

  const renderIsLoading = () => {
    if (isLoading) {
      return (
        <Loader />
      )
    }
  }
  const handleSubmit = (ev) => {
    setIsLoading(true)
    try {
      ev.preventDefault()
      const data = new FormData(ev.currentTarget)
      const loginInfo = {
        email: data.get('email'),
        password: data.get('password'),
      }
      loginUser(loginInfo.email, loginInfo.password)
      setIsLoading(false)
    } catch (err) {
      console.error('err', err)
      setIsLoading(false)
    }
  }

  const onChangePage = () => {
    setIsLogin(!isLogin)
  }

  return (
    <main className="login-sign-up-container container flex-column">
      {renderIsLoading()}
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <div dir="rtl">
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: '#1cbf73' }} />
                <Typography component="h1" variant="h5">
                  כיף שחזרתם!
                </Typography>
                <Box component="form" validate='true' onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="כתובת מייל"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="סיסמא"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <Button
                    disabled={isLoading}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    כניסה לחשבון שלי
                  </Button>

                  <Grid container justifyContent="center">
                    <Grid item xs justifyContent="center">
                      <NavLink to="/" variant="body2" style={{ textAlign: 'center', justifyContent: 'center', paddingInlineStart: '35%' }}>
                        שכחתי סיסמה
                      </NavLink>
                    </Grid>
                  </Grid>

                  {/* <div id="loginDiv" className="googleSignin flex-column" style={{ minWidth: '100%', marginBlock: '1rem', paddingInlineStart: '5rem' }}>
                  </div> */}

                  <Grid container justifyContent="center">
                    <Grid item>
                      חדשים באתר?
                      <NavLink to="/signup" variant="body2" onClick={onChangePage} style={{ textDecoration: 'underline' }}>
                        הרשמו כאן
                      </NavLink>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </div>
        </ThemeProvider>
      </CacheProvider >
    </main >
  )
}

