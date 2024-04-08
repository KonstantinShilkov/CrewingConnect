import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import { UserContext } from '../../context/user-context';

const HeaderNav = () => {
  const { logout, isAuth, currentUserEmail } = useContext(UserContext);

  return (
    <nav className={s.navContainer}>
      <div className={s.navItems}>
        <NavLink
          className={s.item}
          to="vacancies"
          style={({ isActive }) => (isActive ? { color: 'SteelBlue' } : { color: 'inherit' })}>
          Vacancies
        </NavLink>
        <NavLink
          className={s.item}
          to="contacts"
          style={({ isActive }) => (isActive ? { color: 'SteelBlue' } : { color: 'inherit' })}>
          Contacts
        </NavLink>
      </div>

      {isAuth ? (
        <div className={s.emailLogout}>
          <NavLink
            className={s.item}
            to="profile"
            style={({ isActive }) => (isActive ? { color: 'SteelBlue' } : { color: 'inherit' })}>
            {currentUserEmail}
          </NavLink>

          <NavLink
            className={s.item}
            onClick={logout}
            style={({ isActive }) => (isActive ? { color: 'inherit' } : { color: 'inherit' })}>
            Logout
          </NavLink>
        </div>
      ) : (
        <NavLink
          className={s.item}
          to="login"
          style={({ isActive }) => (isActive ? { color: 'SteelBlue' } : { color: 'inherit' })}>
          Login
        </NavLink>
      )}
    </nav>
  );
};

export default HeaderNav;
