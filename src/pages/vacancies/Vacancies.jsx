import React from 'react';
import s from './Vacancies.module.css';
import Vacancy from './Vacancy';
import Filters from './Filters';
import { useVacancies } from './hooks/useVacancies';
import Preloader from '../../common/Preloader';

const Vacancies = () => {
  const { filteredList, vacanciesList, getSelectedVesselTypes, getSelectedRanks, isFetching } =
    useVacancies();

  if (isFetching) {
    return (
      <div className={s.preloader}>
        <Preloader />
      </div>
    );
  }
  console.log(vacanciesList);
  return (
    <div className={s.main}>
      <div className={s.filter}>
        <Filters
          vesselType={vacanciesList.map(vacancy => vacancy.vesselType)}
          rank={vacanciesList.map(vacancy => vacancy.rank)}
          vacanciesList={vacanciesList}
          getSelectedVesselTypes={getSelectedVesselTypes}
          getSelectedRanks={getSelectedRanks}
        />
      </div>
      <div className={s.vacancies}>
        {filteredList.map(vacancy => (
          <Vacancy key={vacancy.id} vacancy={vacancy} />
        ))}
      </div>
    </div>
  );
};

export default Vacancies;
