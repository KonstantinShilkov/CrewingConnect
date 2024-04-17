import React, { useContext, useState } from 'react';
import s from './QualificationDocuments.module.css';
import { Card } from '@mui/joy';
import { UserContext } from '../../../context/user-context';
import Preloader from '../../../common/Preloader';
import Button from '@mui/joy/Button';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import LicencesTable from './LicencesTable';
import SeamanBookIdTable from './SeamanBookIdTable';
import QualificationCertificates from './QualificationCertificatesTable';

const QualificationDocuments = () => {
  const { isFetching } = useContext(UserContext);
  const [value, setValue] = useState('licences');

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
    <div className={s.qualificationDocContainer}>
      <Card className={s.card}>
        <div className={s.toggleButton}>
          <ToggleButtonGroup value={value} exclusive onChange={handleChange}>
            <Button value="licences">Licences </Button>
            <Button value="seamanbookid">Seafarer's Book/Id</Button>
            <Button value="certificates">Qualifications / Certificates</Button>
          </ToggleButtonGroup>
        </div>
        <div className={s.visas}>
          {value === 'licences' ? <LicencesTable /> : null}
          {value === 'seamanbookid' ? <SeamanBookIdTable /> : null}
          {value === 'certificates' ? <QualificationCertificates /> : null}
        </div>
      </Card>
    </div>
  );
};

export default QualificationDocuments;