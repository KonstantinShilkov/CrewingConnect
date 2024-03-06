import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../context/user-context';
import { getDocs } from 'firebase/firestore';

export const useVacancies = () => {
  const [vacanciesList, setVacanciesList] = useState([]);
  const { vacanciesCollectionRef } = useContext(UserContext);
  const [filteredList, setFilteredList] = useState(vacanciesList);
  const [vesselTypeSelected, setVesselType] = useState([]);

  const getVacanciesList = async () => {
    try {
      const data = await getDocs(vacanciesCollectionRef);
      const vacanciesData = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setVacanciesList(vacanciesData);
      setFilteredList(vacanciesData);
    } catch (err) {
      console.log(err);
    }
  };

  const getSelectedTypes = vesselTypes => {
    setVesselType(vesselTypes);
  };

  const filterByVesselType = vesselTypeSelected => {
    let newList = vacanciesList;
    if (vesselTypeSelected.length) {
      newList = vacanciesList.filter(vacancy => vesselTypeSelected.includes(vacancy.vesselType));
    }
    setFilteredList(newList);
  };

  useEffect(() => {
    getVacanciesList();
  }, []);

  useEffect(() => {
    filterByVesselType(vesselTypeSelected);
  }, [vesselTypeSelected]);

  return { filteredList, getSelectedTypes, vacanciesList };
};
