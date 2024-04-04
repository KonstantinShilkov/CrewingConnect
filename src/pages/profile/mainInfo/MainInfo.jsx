import { TextField } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import s from './MainInfo.module.css';
import { UserContext } from '../../../context/user-context';
import { Button } from '@mui/joy';
import { useForm } from 'react-hook-form';
import Preloader from '../../../common/Preloader';

const MainInfo = () => {
  const { updateMainInfoData, currentUserData, isFetching } = useContext(UserContext);

  const saveButtonClick = data => {
    updateMainInfoData(data);
  };

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue('name', currentUserData.name);
    setValue('surname', currentUserData.surname);
    setValue('middleName', currentUserData.middleName);
    setValue('dateOfBirth', currentUserData.dateOfBirth);
    setValue('age', currentUserData.age);
    setValue('placeOfBirth', currentUserData.placeOfBirth);
    setValue('nationality', currentUserData.nationality);
    setValue('presentRank', currentUserData.presentRank);
    setValue('rankApplied', currentUserData.rankApplied);
    setValue('availableDate', currentUserData.availableDate);
    setValue('vesselType', currentUserData.vesselType);
  }, [currentUserData]);

  if (isFetching) {
    return (
      <div className={s.preloader}>
        <Preloader />
      </div>
    );
  }
  return (
    <div className={s.mainInfoContainer}>
      <form onSubmit={handleSubmit(saveButtonClick)}>
        <div className={s.textFieldName}>
          <div>
            <TextField {...register('name')} required size="small" label="Name" />
          </div>
          <div>
            <TextField {...register('surname')} required size="small" label="Surname" />
          </div>
          <div>
            <TextField {...register('middleName')} size="small" label="Middle Name" />
          </div>
        </div>
        <div className={s.textFieldPlaceOfBirth}>
          <div>
            <TextField
              {...register('placeOfBirth')}
              style={{ width: '410px' }}
              size="small"
              label="Place of Birth"
            />
          </div>
          <div>
            <div>
              <TextField {...register('nationality')} size="small" label="Nationality" />
            </div>
          </div>
        </div>
        <div className={s.textFieldAge}>
          <div>
            <TextField
              {...register('dateOfBirth')}
              size="small"
              type="date"
              InputLabelProps={{ shrink: true }}
              label="Date of Birth"
              style={{ width: '195px' }}
            />
          </div>
          <div>
            <TextField
              {...register('age')}
              size="small"
              label="Age"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                readOnly: true,
              }}
              placeholder="Age"
            />
          </div>
        </div>

        <div className={s.textFieldRank}>
          <div>
            <TextField {...register('presentRank')} size="small" label="Present Rank" />
          </div>
          <div>
            <TextField {...register('rankApplied')} size="small" label="Rank Applied For" />
          </div>
        </div>
        <div className={s.textFieldAvailableDate}>
          <div>
            <TextField {...register('vesselType')} size="small" label="Vessel Type" />
          </div>
          <div>
            <TextField
              {...register('availableDate')}
              size="small"
              type="date"
              InputLabelProps={{ shrink: true }}
              style={{ width: '195px' }}
              label="Available Date"
            />
          </div>
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

export default MainInfo;
