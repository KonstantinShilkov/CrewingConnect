import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import { UserContext } from '../../context/user-context';

const HeaderNav = () => {
  const { logout, isAuth, onAuthState } = useContext(UserContext);

  useEffect(() => {
    onAuthState();
  });

  return (
    <nav className={s.navContainer}>
      <div className={s.navItems}>
        <NavLink
          className={s.item}
          to="vacancies"
          style={({ isActive }) => (isActive ? { color: 'SteelBlue' } : { color: 'inherit' })}>
          {' '}
          Vacancies{' '}
        </NavLink>
        <NavLink
          className={s.item}
          to="contacts"
          style={({ isActive }) => (isActive ? { color: 'SteelBlue' } : { color: 'inherit' })}>
          {' '}
          Contacts{' '}
        </NavLink>
      </div>

      {isAuth ? (
        <NavLink
          className={s.item}
          onClick={logout}
          style={({ isActive }) => (isActive ? { color: 'inherit' } : { color: 'inherit' })}>
          {' '}
          Logout{' '}
        </NavLink>
      ) : (
        <NavLink
          className={s.item}
          to="login"
          style={({ isActive }) => (isActive ? { color: 'SteelBlue' } : { color: 'inherit' })}>
          {' '}
          Login{' '}
        </NavLink>
      )}
    </nav>
  );
};

export default HeaderNav;
