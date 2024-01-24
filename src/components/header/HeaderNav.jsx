import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Header.module.css'

const HeaderNav = () => {
    return (
        <nav className={s.navContainer}>
            <div className={s.navItems}>
                <NavLink className={s.item} to="vacancies"
                         style={({isActive}) =>
                             (isActive ? {color: 'SteelBlue'} : {color: 'inherit'})}> Vacancies </NavLink>
                <NavLink className={s.item} to="contacts"
                         style={({isActive}) =>
                             (isActive ? {color: 'SteelBlue'} : {color: 'inherit'})}> Contacts </NavLink>
            </div>

            <NavLink className={s.item} to="login"
                     style={({isActive}) =>
                         (isActive ? {color: 'SteelBlue'} : {color: 'inherit'})}> Login </NavLink>
        </nav>
    );
}

export default HeaderNav
