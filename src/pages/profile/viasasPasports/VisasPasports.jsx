import React from 'react';
import ProfileNavbar from '../profileNavbar/ProfileNavbar';
import s from './VisasPasports.module.css';

const VisasPasports = () => {
  return (
    <div>
      <div className={s.profileNavbar}>
        <ProfileNavbar />
      </div>
      <div>Visas Pasports</div>
    </div>
  );
};

export default VisasPasports;
