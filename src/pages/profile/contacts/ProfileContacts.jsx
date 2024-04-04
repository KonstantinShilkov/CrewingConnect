import React, { useContext, useEffect } from 'react';
import s from './ProfileContacts.module.css';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../context/user-context';
import Preloader from '../../../common/Preloader';
import { Button } from '@mui/joy';
import { TextField } from '@mui/material';

const ProfileContacts = () => {
  const { updateContactsData, currentUserData, isFetching } = useContext(UserContext);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue('mobPhone', currentUserData.mobPhone);
    setValue('email', currentUserData.email);
    setValue('homeAddress', currentUserData.homeAddress);
    setValue('nearestAirport', currentUserData.nearestAirport);
  }, [setValue, currentUserData]);

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
      <form onSubmit={handleSubmit(saveButtonClick)}>
        <div className={s.phoneEmail}>
          <div>
            <TextField
              {...register('mobPhone')}
              size="small"
              style={{ width: '220px' }}
              label="Mobile Pnone"
              placeholder=" + (Country code) number "
            />
          </div>
          <div>
            <TextField
              {...register('email')}
              size="small"
              style={{ width: '220px' }}
              label="Email"
              type="email"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        </div>
        <div className={s.homeAddress}>
          <TextField
            {...register('homeAddress')}
            size="small"
            label="Home Address"
            style={{ width: '460px' }}
            placeholder="Country, City, Steet , Apartment "
          />
        </div>
        <div className={s.nearestAirport}>
          <TextField
            {...register('nearestAirport')}
            size="small"
            label="Nearest Airport"
            style={{ width: '460px' }}
            placeholder="Country, City, Airport Name or Code Name"
          />
        </div>
        <div className={s.button}>
          <Button size="sm" type="submit" variant="solid" color="neutral">
            Save CV
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileContacts;
