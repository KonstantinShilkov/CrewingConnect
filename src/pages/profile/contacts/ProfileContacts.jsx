import React from 'react';
import ProfileNavbar from '../profileNavbar/ProfileNavbar';
import s from './ProfileContacts.module.css';

const ProfileContacts = () => {
  return (
    <div>
      <div className={s.profileNavbar}>
        <ProfileNavbar />
      </div>
      <div>Contacts</div>
    </div>
  );
};

export default ProfileContacts;
