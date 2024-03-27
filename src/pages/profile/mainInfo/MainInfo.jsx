import { TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import s from './MainInfo.module.css';
import { UserContext } from '../../../context/user-context';
import { Button } from '@mui/joy';
import { useForm } from 'react-hook-form';
import Preloader from '../../../common/Preloader';
import ProfileNavbar from '../profileNavbar/ProfileNavbar';
import { useEffect } from 'react';

const MainInfo = () => {
  const { updateMainInfoData, currentUserData, isFetching } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);

  const editButtonClick = () => {
    setEditMode(true);
  };
  const saveButtonClick = data => {
    updateMainInfoData(data);
    setEditMode(false);
  };

  useEffect(() => {
    // if (!currentUserData.hasOwnProperty('name')) {
    if (currentUserData && (currentUserData.name === undefined || currentUserData.name === '')) {
      setEditMode(true);
    }
    //     // if (!currentUserData.surname.length) {
    //     //   setEditMode(true);
    //     // }
  }, [currentUserData]);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editMode) {
      setValue('name', currentUserData.name);
      setValue('surname', currentUserData.surname);
      setValue('middleName', currentUserData.middleName);
    }
  }, [editMode, currentUserData.name, setValue]);

  if (isFetching) {
    return (
      <div className={s.preloader}>
        <Preloader />
      </div>
    );
  }
  return (
    <div>
      <div className={s.profileNavbar}>
        <ProfileNavbar />
      </div>
      <div className={s.mainInfoContainer}>
        <div>Full Name:</div>
        <form onSubmit={handleSubmit(saveButtonClick)}>
          {!editMode && (
            <div className={s.disabledForms}>
              <div>
                <TextField
                  size="small"
                  disabled
                  value={currentUserData.name ? currentUserData.name : ''}
                  label="Name"
                />
              </div>
              <div>
                <TextField
                  size="small"
                  label="Surname"
                  disabled
                  value={currentUserData.surname ? currentUserData.surname : ''}
                />
              </div>
              <div>
                <TextField
                  size="small"
                  label="Middle Name"
                  disabled
                  value={currentUserData.middleName ? currentUserData.middleName : ''}
                />
              </div>
            </div>
          )}
          {editMode && (
            <div className={s.enabledForms}>
              <div>
                <TextField
                  {...register('name', {
                    required: 'Name is Required',
                    minLength: {
                      value: 1,
                    },
                  })}
                  size="small"
                  label="Name"
                  autoFocus
                />
                <p>{errors.name?.message}</p>
              </div>
              <div>
                <TextField
                  {...register('surname', {
                    required: 'Surname is Required',
                    minLength: {
                      value: 1,
                    },
                  })}
                  size="small"
                  label="Surname"
                />
                <p>{errors.surname?.message}</p>
              </div>
              <div>
                <TextField {...register('middleName')} size="small" label="Middle Name" />
              </div>
            </div>
          )}
          <div></div>
          <div className={s.buttons}>
            <Button size="sm" variant="solid" color="neutral" onClick={editButtonClick}>
              Edit CV
            </Button>
            <Button size="sm" type="submit" variant="solid" color="neutral">
              Save CV
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MainInfo;
