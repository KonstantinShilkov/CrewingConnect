import { Button } from '@mui/joy';
import React, { useContext } from 'react';
import s from './Profile.module.css';
import { NavLink } from 'react-router-dom';
import { TextField } from '@mui/material';
import { UserContext } from '../../context/user-context';
import Preloader from '../../common/Preloader';

const Profile = () => {
  const { currentUserData, isFetching } = useContext(UserContext);

  if (isFetching) {
    return (
      <div className={s.preloader}>
        <Preloader />
      </div>
    );
  }

  return (
    <div className={s.profileContainer}>
      <div className={s.mainInfoContainer}>
        <div className={s.profileFullName}>
          <div>
            <TextField
              size="small"
              disabled
              fullWidth
              label="Full Name"
              style={{ width: '400px' }}
              value={`${currentUserData.name ? currentUserData.name : ''} ${
                currentUserData.surname ? currentUserData.surname : ''
              } ${currentUserData.middleName ? currentUserData.middleName : ''}`}
            />
          </div>
        </div>
        <div className={s.presentRank}>
          <TextField
            size="small"
            disabled
            fullWidth
            label="Present Rank"
            style={{ width: '200px' }}
            value=""
          />
        </div>
        <div className={s.appliedRank}>
          <TextField
            size="small"
            disabled
            fullWidth
            label="Applied for Rank"
            style={{ width: '200px' }}
            value=""
          />
        </div>
        <div className={s.vesselType}>
          <TextField
            size="small"
            disabled
            fullWidth
            label="Type of Vessel"
            style={{ width: '200px' }}
            value=""
          />
        </div>
        <div className={s.availibaleDate}>
          <TextField
            size="small"
            disabled
            fullWidth
            label="Availibale Date"
            style={{ width: '200px' }}
            value=""
          />
        </div>
      </div>
      <div className={s.button}>
        <NavLink className={s.registration} to="/profile/maininfo">
          <Button size="sm" type="submit" variant="solid" color="neutral" fullWidth>
            Edit CV
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default Profile;
