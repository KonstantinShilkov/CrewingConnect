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
      <>
        {' '}
        <Preloader />{' '}
      </>
    );
  }

  return (
    <div className={s.main}>
      <div className={s.headerText}>Opened Vacancies </div>
      <div>
        <div className={s.filter}>
          <Filters
            vesselType={vacanciesList.map(vacancy => vacancy.vesselType)}
            rank={vacanciesList.map(vacancy => vacancy.rank)}
            vacanciesList={vacanciesList}
            getSelectedVesselTypes={getSelectedVesselTypes}
            getSelectedRanks={getSelectedRanks}
          />
        </div>
      </div>
      <div className={s.vacancies}>
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
  );
};

export default Vacancies;
