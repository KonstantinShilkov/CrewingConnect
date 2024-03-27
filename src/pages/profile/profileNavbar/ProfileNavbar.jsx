import React, { useEffect, useState } from 'react';
import s from './ProfileNavbar.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Tabs, Tab } from '@mui/material';

const ProfileNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState();

  useEffect(() => {
    const path = location.pathname.split('/').pop();
    setValue(path);
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(`/profile/${newValue}`);
  };
  return (
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
          <Tab value="visaspasports" label="Visas/Pasports" />
        </Tabs>
      </Box>
    </div>
  );
};

export default ProfileNavbar;
