import React, { useEffect, useState } from 'react';
import s from './ProfileNavbar.module.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Box, Tabs, Tab, IconButton } from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

const ProfileNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState('maininfo');

  useEffect(() => {
    const path = location.pathname.split('/').pop();
    setValue(path);
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
    navigate(`/profile/edit/${newValue}`);
  };
  return (
    <div className={s.navBar}>
      <div className={s.tabs}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="profile tabs">
            <Tab value="maininfo" label="Main Info" />
            <Tab value="contacts" label="Contacts" />
            <Tab value="visaspassports" label="Visas/Passports" />
            <Tab value="qualificationdoc" label="Qualification Docs" />
            <Tab value="experience" label="Sea Experience" />
            <Tab value="courses" label="Marine Courses" />
          </Tabs>
        </Box>
      </div>
      <div className={s.profileButton}>
        <NavLink to="/profile">
          <IconButton size="large">
            <AssignmentIndIcon />
          </IconButton>
        </NavLink>
      </div>
    </div>
  );
};

export default ProfileNavbar;
