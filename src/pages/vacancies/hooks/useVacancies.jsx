import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../context/user-context';
import { getDocs } from 'firebase/firestore';

export const useVacancies = () => {
  const [vacanciesList, setVacanciesList] = useState([]);
  const { vacanciesCollectionRef } = useContext(UserContext);
  const [filteredList, setFilteredList] = useState(vacanciesList);
  const [vesselTypeSelected, setVesselType] = useState([]);
  const [rankSelected, setRankSelected] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const getVacanciesList = async () => {
    try {
      const data = await getDocs(vacanciesCollectionRef);
      const vacanciesData = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setVacanciesList(vacanciesData);
      setFilteredList(vacanciesData);
      setIsFetching(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getSelectedVesselTypes = vesselTypes => {
    setVesselType(vesselTypes);
  };
  const getSelectedRanks = ranks => {
    setRankSelected(ranks);
  };

  const filterBySelectors = (vesselTypeSelected, rankSelected) => {
    let newList = vacanciesList;
    if (vesselTypeSelected.length) {
      newList = newList.filter(vacancy => vesselTypeSelected.includes(vacancy.vesselType));
    }
    if (rankSelected.length) {
      newList = newList.filter(vacancy => rankSelected.includes(vacancy.rank));
    }
    setFilteredList(newList);
  };

  useEffect(() => {
    getVacanciesList();
  }, [isFetching]);

  useEffect(() => {
    filterBySelectors(vesselTypeSelected, rankSelected);
  }, [vesselTypeSelected, rankSelected]);

  return { filteredList, getSelectedVesselTypes, vacanciesList, getSelectedRanks, isFetching };
};
