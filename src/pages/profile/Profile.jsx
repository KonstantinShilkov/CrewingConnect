import React, { useContext } from 'react';
import s from './Profile.module.css';
import { NavLink } from 'react-router-dom';
import { Grid, IconButton, TextField } from '@mui/material';
import { UserContext } from '../../context/user-context';
import Preloader from '../../common/Preloader';
import EditNoteIcon from '@mui/icons-material/EditNote';
import defaultAvatar from '../../assets/images/defaultAvatar.jpeg';
import { Card } from '@mui/joy';
import ProfileTable from './ProfileTable';

const Profile = () => {
  const { currentUserData, isFetching } = useContext(UserContext);
  const dayjs = require('dayjs');

  if (isFetching) {
    return (
      <div className={s.preloader}>
        <Preloader />
      </div>
    );
  }

  return (
    <div className={s.profileContainer}>
      <Card className={s.card}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <div className={s.profileTextfields}>
              <div className={s.age}>
                <TextField
                  size="small"
                  fullWidth
                  label="Age"
                  style={{ width: '150px' }}
                  value={currentUserData.age ? currentUserData.age : ''}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className={s.presentRank}>
                <TextField
                  size="small"
                  fullWidth
                  label="Present Rank"
                  style={{ width: '150px', color: 'primary' }}
                  value={currentUserData.presentRank ? currentUserData.presentRank : ''}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className={s.appliedRank}>
                <TextField
                  size="small"
                  fullWidth
                  label="Applied for Rank"
                  style={{ width: '150px' }}
                  value={currentUserData.rankApplied ? currentUserData.rankApplied : ''}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className={s.vesselType}>
                <TextField
                  size="small"
                  fullWidth
                  label="Type of Vessel"
                  style={{ width: '150px' }}
                  value={currentUserData.vesselType ? currentUserData.vesselType : ''}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className={s.availibaleDate}>
                <TextField
                  size="small"
                  fullWidth
                  label="Availibale Date"
                  style={{ width: '150px' }}
                  value={
                    currentUserData.availableDate
                      ? dayjs(currentUserData.availableDate).format('DD.MM.YYYY')
                      : ''
                  }
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={7}>
            <div className={s.avatarContainer}>
              <div className={s.name}>
                <TextField
                  size="small"
                  fullWidth
                  label="Full Name"
                  style={{ width: '350px' }}
                  value={`${currentUserData.name ? currentUserData.name : ''} ${
                    currentUserData.surname ? currentUserData.surname : ''
                  } ${currentUserData.middleName ? currentUserData.middleName : ''}`}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className={s.avatar}>
                <img src={currentUserData.photo || defaultAvatar} className={s.avatar} />
              </div>
              <div className={s.button}>
                <NavLink to="/profile/edit/maininfo">
                  <IconButton size="large">
                    <EditNoteIcon />
                  </IconButton>
                </NavLink>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <ProfileTable />
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default Profile;
