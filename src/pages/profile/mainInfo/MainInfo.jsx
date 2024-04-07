import { Grid, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import s from './MainInfo.module.css';
import { UserContext } from '../../../context/user-context';
import { Button, Card } from '@mui/joy';
import { useForm } from 'react-hook-form';
import Preloader from '../../../common/Preloader';

const MainInfo = () => {
  const { updateMainInfoData, currentUserData, isFetching } = useContext(UserContext);
  const [buttonSaveIsActive, setButtonSaveIsActive] = useState(false);

  const saveButtonClick = data => {
    updateMainInfoData(data);
  };

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (
      watch().name !== currentUserData.name ||
      watch().surname !== currentUserData.surname ||
      watch().middleName !== currentUserData.middleName ||
      watch().dateOfBirth !== currentUserData.dateOfBirth ||
      watch().placeOfBirth !== currentUserData.placeOfBirth ||
      watch().nationality !== currentUserData.nationality ||
      watch().presentRank !== currentUserData.presentRank ||
      watch().rankApplied !== currentUserData.rankApplied ||
      watch().availableDate !== currentUserData.availableDate ||
      watch().vesselType !== currentUserData.vesselType
    ) {
      setButtonSaveIsActive(true);
    } else {
      setButtonSaveIsActive(false);
    }
  }, [watch()]);

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
      <Card className={s.card}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit(saveButtonClick)}>
              <div className={s.textFieldName}>
                <div>
                  <TextField
                    {...register('name')}
                    required
                    size="small"
                    label="Name"
                    style={{ width: '160px' }}
                  />
                </div>
                <div>
                  <TextField
                    {...register('surname')}
                    required
                    size="small"
                    label="Surname"
                    style={{ width: '160px' }}
                  />
                </div>
                <div>
                  <TextField
                    {...register('middleName')}
                    size="small"
                    label="Middle Name"
                    style={{ width: '160px' }}
                  />
                </div>
              </div>
              <div className={s.textFieldDateOfBirthNationality}>
                <div>
                  <TextField
                    {...register('dateOfBirth')}
                    size="small"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    label="Date of Birth"
                    style={{ width: '160px' }}
                  />
                </div>
                <div>
                  <TextField
                    {...register('nationality')}
                    size="small"
                    label="Nationality"
                    style={{ width: '160px' }}
                  />
                </div>
              </div>
              <div className={s.textFieldPlaceOfBirth}>
                <div>
                  <TextField
                    {...register('placeOfBirth')}
                    style={{ width: '335px' }}
                    size="small"
                    label="Place of Birth"
                  />
                </div>
              </div>

              <div className={s.textFieldRank}>
                <div>
                  <TextField
                    {...register('presentRank')}
                    size="small"
                    label="Present Rank"
                    style={{ width: '160px' }}
                  />
                </div>
                <div>
                  <TextField
                    {...register('rankApplied')}
                    size="small"
                    label="Rank Applied For"
                    style={{ width: '160px' }}
                  />
                </div>
              </div>
              <div className={s.textFieldAvailableDate}>
                <div>
                  <TextField
                    {...register('vesselType')}
                    size="small"
                    label="Vessel Type"
                    style={{ width: '160px' }}
                  />
                </div>
                <div>
                  <TextField
                    {...register('availableDate')}
                    size="small"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    style={{ width: '160px' }}
                    label="Available Date"
                  />
                </div>
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

export default MainInfo;
