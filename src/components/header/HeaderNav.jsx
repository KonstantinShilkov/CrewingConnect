import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import { UserContext } from '../../context/user-context';
import AccountMenu from '../AccountMenu';

const HeaderNav = () => {
  const { logout, isAuth, currentUserData, isFetching, avatar } = useContext(UserContext);

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
        <NavLink
          className={s.item}
          to="askai"
          style={({ isActive }) => (isActive ? { color: 'SteelBlue' } : { color: 'inherit' })}>
          Ask AI
        </NavLink>
      </div>

      {isAuth ? (
        <div className={s.profileMenu}>
          <AccountMenu
            logout={logout}
            currentUserData={currentUserData}
            isFetching={isFetching}
            avatar={avatar}
          />
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
