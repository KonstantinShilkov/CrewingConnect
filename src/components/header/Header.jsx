import React, { useMemo } from 'react';
import HeaderNav from './HeaderNav';
import s from './Header.module.css';
import { useLocation } from 'react-router-dom';

const noHeaderRoutes = ['/login', '/register'];

const Header = () => {
  const location = useLocation();

  const hideHeader = useMemo(() => {
    return noHeaderRoutes.includes(location.pathname);
  }, [location]);

  console.log(location);

  if (hideHeader) {
    return <></>;
  }

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <HeaderNav />
      </div>
    </div>
  );
};

export default Header;
