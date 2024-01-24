import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import s from './Header.module.css'


const HeaderNav = () => {

  return (
    <nav className={s.navContainer} >
      <div className={s.item1}>
        <NavLink to="vacancies"
          style={({ isActive }) =>
            (isActive ? { color: 'SteelBlue' } : { color: 'inherit' })} > Vacancies </NavLink>
      </div>
      <div className={s.item2}>
        <NavLink to="contacts"
          style={({ isActive }) =>
            (isActive ? { color: 'SteelBlue' } : { color: 'inherit' })} > Contacts </NavLink>
      </div>
      <div className={s.item3}>
        <NavLink className={s.login} to="login"
          style={({ isActive }) =>
            (isActive ? { color: 'SteelBlue' } : { color: 'inherit' })} > Login </NavLink>
      </div>
    </nav>
  );
}

export default HeaderNav