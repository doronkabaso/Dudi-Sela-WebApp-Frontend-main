import React, { useState, useRef, useEffect, useCallback } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signout, setUserUid, setUserRole } from '../../../store/actions/user.actions.js'
import { ProfileMenu } from '../profile-menu/profile-menu.jsx'
import { SideMenu } from '../side-menu/side-menu.jsx'
import { useWindowDimensions } from '../../../hooks/useWindowDimensions.jsx'
import { userService } from '../../../services/user.service.js'
import { courtService } from '../../../services/court.service.js'

export const AppHeader = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  let loggedUser = useSelector((storeState) => storeState.userModule.loggedUser)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [isSideMenu, setSideMenu] = useState(false)
  const { width } = useWindowDimensions()
  const [scrolled, setScrolled] = useState(false)
  const role = useSelector((storeState) => storeState.userModule.role)

  const menuRef = useRef(null)
  const profileRef = useRef(null)

  let [isActive, setIsActive] = useState(false)
  let classHamburgerMenu = (width < 900) ? 'visible' : 'hidden'
  let classNavList = (width < 600) ? 'hidden' : ''

  const onToggleSideMenu = useCallback(() => {
    let flag = !isSideMenu
    setSideMenu(flag)
  }, [isSideMenu])

  const handleScroll = useCallback((e) => {
    setScrolled(window.scrollY < 200)
  }, [setScrolled])

  const handleSideClickOutside = useCallback((e) => {
    if (menuRef.current && isSideMenu && !menuRef.current.contains(e.target)) onToggleSideMenu()
  }, [isSideMenu, onToggleSideMenu])

  const onToggleProfileMenu = useCallback((e) => {
    setShowProfileMenu(!showProfileMenu)
  }, [showProfileMenu])

  const handleProfileClickOutside = useCallback((e) => {
    if (profileRef.current && showProfileMenu && !profileRef.current.contains(e.target)) onToggleProfileMenu()
  }, [showProfileMenu, onToggleProfileMenu])

  useEffect(() => {
    document.addEventListener("click", handleSideClickOutside)
  }, [isSideMenu, handleSideClickOutside])

  useEffect(() => {
    document.addEventListener("click", handleProfileClickOutside)
  }, [showProfileMenu, handleProfileClickOutside])

  useEffect(() => {
    if (pathname === '/') {
      window.addEventListener("scroll", handleScroll)
    }
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [pathname, handleScroll])

  const setUser = useCallback(async (_user) => {
    const res = await courtService.getUser({"email": JSON.parse(_user).email})
    res && dispatch(setUserRole(res.data.role))
  }, [])

  useEffect(() => {
    const _user = sessionStorage.getItem('loggedUser')
    if (!role && _user) {
      setUser(_user)
    }
  }, [])


  const onCloseMenu = () => {
    setShowProfileMenu(false)
  }

  const onToggleMenu = (e) => {
    e.stopPropagation()
    setShowProfileMenu(!showProfileMenu)
  }

  if (loggedUser && !loggedUser.picture) {
    loggedUser.picture = "https://res.cloudinary.com/primap/image/upload/v1677773927/General/Dudi%20Sela/avatar-light_siimvl.svg"
  }

  const handleClick = () => {
    setIsActive(!isActive)
  }

  const handleSignout = () => {
    userService.authSignout()
      .then((response) => {
        dispatch(setUserUid(null))
        dispatch(setUserRole(null))
        dispatch(signout())
        document.location.href = '/'
        userService.authSignout();
      })
  }

  return (
    pathname !== '/dashboard' ? (
      <header className={`header container flex align-center ${(scrolled && pathname === '/') ? 'scrolled' : ''}`}>
        <article className="logo-hamburger-container flex align-center">
          <div className="side-menu">
            {width < 900 && <button ref={menuRef} onClick={onToggleSideMenu} className={`hamburger-icon ${classHamburgerMenu}`}>
              {isSideMenu && <SideMenu menuOpen={isSideMenu} closeMenu={onToggleSideMenu} user={loggedUser} handleClick={handleClick} handleSignout={handleSignout} />}
            </button>}
          </div>
          <div className="logo">
            <NavLink to="/" className="site-logo">
              <img src="https://res.cloudinary.com/primap/image/upload/v1677420672/General/Dudi%20Sela/DudiLogo_wdbxir.svg" className="app-logo"
                alt="logo" />
            </NavLink>
          </div>
        </article>
        <ul className={`nav-list clean-list flex align-center ${classNavList}`}>

          {(loggedUser ? <li><NavLink to={`/user-reservations`} className="link-page">ההזמנות שלי</NavLink>
          </li> : null)}

          {(loggedUser ? <li><NavLink to={`/user-reservations/new-reservation`} className="link-page">הזמנת מגרש</NavLink>
          </li> : <li><NavLink to={'/signin'} onClick={handleClick} className="link-page">הזמנת מגרש</NavLink>
          </li>)}


          <li><NavLink to={`/learntennis`} onClick={handleClick} className="link-page">לימוד טניס</NavLink>
          </li>

          <li><NavLink to={`/contact`} onClick={handleClick} className="link-page">צרו קשר</NavLink>
          </li>

          <li><NavLink to={`/about`} onClick={handleClick} className="link-page">על האקדמיה</NavLink>
          </li>

          {((role === "admin" || role === "instructor") && loggedUser ? <li><NavLink to={`/manager`} className="link-page">מנהל ההזמנות</NavLink>
          </li> : null)}

          {((role === "admin" || role === "instructor") && loggedUser ? <li><NavLink to={`/dashboard`} className="link-page">לוח הודעות</NavLink>
          </li> : null)}

          <li>
            {!loggedUser && <NavLink to='/signin' rel="nofollow" className="open-popup-login link-page">כניסה</NavLink>}
            <div className="avatar-container">
              {loggedUser && <img className="avatar-img" src={`${loggedUser.picture}`} onClick={onToggleMenu} alt="Avatar"></img>}
            </div>

            <div className="profile-container" ref={profileRef}>
              {showProfileMenu && <ProfileMenu menuOpen={showProfileMenu} user={loggedUser} closeMenu={onCloseMenu} onToggleMenu={onToggleProfileMenu} handleSignout={handleSignout} />}
            </div>
          </li>

          {!loggedUser ? <li><NavLink to={`/signup`} onClick={handleClick} className="link-page">הרשמה</NavLink>
          </li> : null}

        </ul>

      </header>
    ) : (
      <span></span>
    )
  )
}