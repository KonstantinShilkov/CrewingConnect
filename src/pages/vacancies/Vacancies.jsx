import { Card } from '@mui/joy';
import React from 'react';
import s from './Vacancies.module.css';

import Vacancy from './Vacancy';
import Filters from './Filters';
import { useVacancies } from './hooks/useVacancies';

const Vacancies = () => {
  const { filteredList, vacanciesList, getSelectedTypes } = useVacancies();

  return (
    <div>
      <div>Opened Vacancies </div>
      <div className={s.vacancies}>
        <div className={s.filter}>
          <Card variant="outlined" sx={{ width: 400, maxWidth: '100%', gap: 1.5 }}>
            Filter
            <div className={s.filters}>
              <Filters
                vesselType={vacanciesList.map(vacancy => vacancy.vesselType)}
                rank={vacanciesList.map(vacancy => vacancy.rank)}
                vacanciesList={vacanciesList}
                getSelectedTypes={getSelectedTypes}
              />
            </div>
          </Card>
        </div>
        <div className={s.card}>
          {filteredList.map(vacancy => (
            <Vacancy
              key={vacancy.id}
              rank={vacancy.rank}
              vesselType={vacancy.vesselType}
              salary={vacancy.salary}
              joinDate={vacancy.joinDate}
              duration={vacancy.duration}
              id={vacancy.id}
              visa={vacancy.visa}
              englishLevel={vacancy.englishLevel}
              prefferedCitizenship={vacancy.prefferedCitizenship}
              vesselBuildYear={vacancy.vesselBuildYear}
              vesselFlag={vacancy.vesselFlag}
              vesselDwt={vacancy.vesselDwt}
              vesselMainEngine={vacancy.vesselMainEngine}
              crewOnboard={vacancy.crewOnboard}
              sailingArea={vacancy.sailingArea}
              additionalInfo={vacancy.additionalInfo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vacancies;
