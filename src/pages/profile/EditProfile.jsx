import React from 'react';
import ProfileNavbar from './profileNavbar/ProfileNavbar';
import s from './Profile.module.css';
import { Route, Routes } from 'react-router-dom';
import MainInfo from './mainInfo/MainInfo';
import VisasPassports from './viasasPassports/VisasPassports';
import ProfileContacts from './contacts/ProfileContacts';

const EditProfile = () => {
  return (
    <div className={s.editProfileContainer}>
      <div className={s.profileNavbar}>
        <ProfileNavbar />
      </div>
      <div className={s.dataContainer}>
        <Routes>
          <Route path="/maininfo" element={<MainInfo />} />
          <Route path="/visaspassports" element={<VisasPassports />} />
          <Route path="/contacts" element={<ProfileContacts />} />
        </Routes>
      </div>
    </div>
  );
};

export default EditProfile;
