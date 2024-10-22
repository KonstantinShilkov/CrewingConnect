import React, { useContext, useEffect, useState } from 'react';
import s from './ProfileContacts.module.css';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../context/user-context';
import Preloader from '../../../common/Preloader';
import { Button, Card } from '@mui/joy';
import { Grid, TextField } from '@mui/material';

const ProfileContacts = () => {
  const { updateContactsData, currentUserData, isFetching } = useContext(UserContext);
  const [buttonSaveIsActive, setButtonSaveIsActive] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue('mobPhone', currentUserData.mobPhone);
    setValue('email', currentUserData.email);
    setValue('homeAddress', currentUserData.homeAddress);
    setValue('nearestAirport', currentUserData.nearestAirport);
  }, [setValue]);

  useEffect(() => {
    if (
      watch().mobPhone !== currentUserData.mobPhone ||
      watch().email !== currentUserData.email ||
      watch().homeAddress !== currentUserData.homeAddress ||
      watch().nearestAirport !== currentUserData.nearestAirport
    ) {
      setButtonSaveIsActive(true);
    } else {
      setButtonSaveIsActive(false);
    }
  }, [watch()]);

  const saveButtonClick = data => {
    updateContactsData(data);
  };
  if (isFetching) {
    return (
      <div className={s.preloader}>
        <Preloader />
      </div>
    );
  }
  return (
    <div className={s.contactsContainer}>
      <Card className={s.card}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit(saveButtonClick)}>
              <div className={s.phoneEmail}>
                <TextField
                  {...register('mobPhone')}
                  size="small"
                  style={{ width: '247px' }}
                  label="Mobile Phone"
                  InputLabelProps={{ shrink: true }}
                  placeholder=" + (Country code) number "
                />
                <TextField
                  {...register('email')}
                  size="small"
                  style={{ width: '247px' }}
                  label="Email"
                  type="email"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className={s.homeAddress}>
                <TextField
                  {...register('homeAddress')}
                  size="small"
                  label="Home Address"
                  InputLabelProps={{ shrink: true }}
                  style={{ width: '510px' }}
                  placeholder="Country, Region, City, Street, Apartment "
                />
              </div>
              <div className={s.nearestAirport}>
                <TextField
                  {...register('nearestAirport')}
                  size="small"
                  label="Nearest Airport"
                  InputLabelProps={{ shrink: true }}
                  style={{ width: '247px' }}
                  placeholder="Country, Region, City, Airport Name or Code"
                />
              </div>
              {buttonSaveIsActive && (
                <div className={s.button}>
                  <Button size="sm" type="submit" variant="solid" color="neutral">
                    Save CV
                  </Button>
                </div>
              )}
            </form>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default ProfileContacts;
