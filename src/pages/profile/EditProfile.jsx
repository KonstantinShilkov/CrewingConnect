import React, { useContext } from 'react';
import ProfileNavbar from './profileNavbar/ProfileNavbar';
import s from './Profile.module.css';
import { Route, Routes } from 'react-router-dom';
import MainInfo from './mainInfo/MainInfo';
import VisasPassports from './viasasPassports/VisasPassports';
import ProfileContacts from './contacts/ProfileContacts';
import { UserContext } from '../../context/user-context';
import Preloader from '../../common/Preloader';
import QualificationDocuments from './qualificationDocuments/QualificationDocuments';
import Experience from './experience/Experience';
import MarineCourses from './marineCourses/MarineCourses';

const EditProfile = () => {
  const { isFetching } = useContext(UserContext);

  if (isFetching) {
    return (
      <div className={s.preloader}>
        <Preloader />
      </div>
    );
  }
  return (
    <div className={s.editProfileContainer}>
      <div className={s.dataContainer}>
        <div className={s.profileNavbar}>
          <ProfileNavbar />
        </div>
        <Routes>
          <Route path="/maininfo" element={<MainInfo />} />
          <Route path="/visaspassports" element={<VisasPassports />} />
          <Route path="/contacts" element={<ProfileContacts />} />
          <Route path="/qualificationdoc" element={<QualificationDocuments />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/courses" element={<MarineCourses />} />
        </Routes>
      </div>
    </div>
  );
};

export default EditProfile;
