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
                const uid = user.uid;
                setIsAuth(true)
            } else {
                setIsAuth(false)
            }
        });
    })

    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate("/login");
        }).catch((error) => {
            console.log(error)
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
                        (isActive ? { color: 'inherit' } : { color: 'inherit' })}> Logout </NavLink>

                :
                <NavLink className={s.item} to="login"
                    style={({ isActive }) =>
                        (isActive ? { color: 'SteelBlue' } : { color: 'inherit' })}> Login </NavLink>
            }

        </nav>
    );
}

export default HeaderNav
