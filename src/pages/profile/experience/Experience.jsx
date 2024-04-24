import React, { useContext, useState } from 'react';
import s from './Experince.module.css';
import { Card } from '@mui/joy';
import { UserContext } from '../../../context/user-context';
import Preloader from '../../../common/Preloader';
import ExperienceTable from './ExperienceTable';

const Experience = () => {
  const { isFetching } = useContext(UserContext);

  if (isFetching) {
    return (
      <div className={s.preloader}>
        <Preloader />
      </div>
    );
  }
  return (
    <div className={s.experienceContainer}>
      <Card className={s.card}>
        <div className={s.experience}>
          <ExperienceTable />
        </div>
      </Card>
    </div>
  );
};

export default Experience;
