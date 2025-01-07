import { NavLink } from "react-router-dom"

export const ProfileMenu = ({ user, closeMenu, onToggleMenu, handleSignout }) => {

    return (
        <section className="profile-menu-wrapper" onClick={onToggleMenu}>
            <div className="profile-menu">
                <ul className="sub-category clean-list flex-column">
                    <li className="menu-item" onClick={() => closeMenu()}><NavLink to={'/user-profile'}>אזור אישי</NavLink></li>
                    {user && <li className="menu-item" onClick={() => closeMenu()}><NavLink to={'/user-reservations'}>ההזמנות שלי</NavLink></li>}
                    <li className="menu-item" onClick={() => closeMenu()}><NavLink to={`/user-reservations/new-reservation`}>הזמנת מגרש</NavLink></li>
                    <li className="menu-item signout" onClick={() => handleSignout()}><NavLink to={`/`}>יציאה</NavLink></li>
                </ul>
            </div>
        </section>
    )
}