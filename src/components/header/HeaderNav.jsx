import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import s from './Header.module.css'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';

const HeaderNav = () => {
    const [isAuth, setIsAuth] = useState([false])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                setIsAuth(true)
                // ...
                console.log("uid", uid)
                console.log(isAuth)
            } else {
                // User is signed out
                // ...
                setIsAuth(false)
                console.log("user is logged out")
                console.log(isAuth)

            }
        });
    })

    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/login");
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log(error)
            // An error happened.
        });
    }

    return (
        <nav className={s.navContainer}>
            <div className={s.navItems}>
                <NavLink className={s.item} to="vacancies"
                    style={({ isActive }) =>
                        (isActive ? { color: 'SteelBlue' } : { color: 'inherit' })}> Vacancies </NavLink>
                <NavLink className={s.item} to="contacts"
                    style={({ isActive }) =>
                        (isActive ? { color: 'SteelBlue' } : { color: 'inherit' })}> Contacts </NavLink>
            </div>

            {isAuth ?
                <NavLink className={s.item} onClick={handleLogout}
                    style={({ isActive }) =>
                        (isActive ? { color: 'inherit' } : { color: 'inherit' })}> LogOut </NavLink>

                :
                <NavLink className={s.item} to="login"
                    style={({ isActive }) =>
                        (isActive ? { color: 'SteelBlue' } : { color: 'inherit' })}> Login </NavLink>
            }

        </nav>
    );
}

export default HeaderNav
