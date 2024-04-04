import React from 'react';
import ProfileNavbar from './profileNavbar/ProfileNavbar';
import s from './Profile.module.css';
import { Route, Routes } from 'react-router-dom';
import MainInfo from './mainInfo/MainInfo';
import VisasPasports from './viasasPasports/VisasPasports';
import ProfileContacts from './contacts/ProfileContacts';

const EditProfile = () => {
  return (
    <div>
      <div className={s.profileNavbar}>
        <ProfileNavbar />
      </div>
      <div>
        <Routes>
          <Route path="/maininfo" element={<MainInfo />} />
          <Route path="/visaspasports" element={<VisasPasports />} />
          <Route path="/contacts" element={<ProfileContacts />} />
        </Routes>
      </div>
    </div>
  );
};

export default EditProfile;
