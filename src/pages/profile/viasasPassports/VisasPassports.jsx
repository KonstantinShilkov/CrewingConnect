import React, { useContext, useState } from 'react';
import s from './VisasPassports.module.css';
import { Card } from '@mui/joy';
import { UserContext } from '../../../context/user-context';
import Preloader from '../../../common/Preloader';
import VisasTable from './VisasTable';
import PassportsTable from './PassportsTable';
import Button from '@mui/joy/Button';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';

const VisasPassports = () => {
  const { isFetching } = useContext(UserContext);
  const [value, setValue] = useState('visas');

  const handleChange = (event, newValue) => {
    if (newValue) {
      setValue(newValue);
    }
  };

  if (isFetching) {
    return (
      <div className={s.preloader}>
        <Preloader />
      </div>
    );
  }
  return (
    <div className={s.visasPasrotsContainer}>
      <Card className={s.card}>
        <div className={s.toggleButton}>
          <ToggleButtonGroup value={value} exclusive onChange={handleChange}>
            <Button value="visas">Visas </Button>
            <Button value="passports">Passports</Button>
          </ToggleButtonGroup>
        </div>
        <div className={s.visaspassports}>
          {value === 'visas' ? <VisasTable /> : null}
          {value === 'passports' ? <PassportsTable /> : null}
        </div>
      </Card>
    </div>
  );
};

export default VisasPassports;
