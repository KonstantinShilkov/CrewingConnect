import React, { useContext } from 'react';
import s from './MarineCourses.module.css';
import { Card } from '@mui/joy';
import { UserContext } from '../../../context/user-context';
import Preloader from '../../../common/Preloader';
import MarineCoursesTable from './MarineCoursesTable';

const MarineCourses = () => {
  const { isFetching } = useContext(UserContext);

  if (isFetching) {
    return (
      <div className={s.preloader}>
        <Preloader />
      </div>
    );
  }
  return (
    <div className={s.marineCoursesContainer}>
      <Card className={s.card}>
        <div className={s.marineCourses}>
          <MarineCoursesTable />
        </div>
      </Card>
    </div>
  );
};

export default MarineCourses;
