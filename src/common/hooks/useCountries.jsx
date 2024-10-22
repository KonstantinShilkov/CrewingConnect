import { useState, useContext } from 'react';
import { UserContext } from '../../context/user-context';
import { getDoc } from 'firebase/firestore';

export const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const { countriesCollectionRef } = useContext(UserContext);
  const [isFetchingCountries, setIsFetchingCountries] = useState(false);

  const getCountries = async () => {
    setIsFetchingCountries(true);
    try {
      const docSnap = await getDoc(countriesCollectionRef);
      if (docSnap.exists()) {
        const countriesData = docSnap.data().countries;
        setCountries(countriesData);
      } else {
        console.log('No such document!');
      }
    } catch (err) {
      console.error('Error fetching countries:', err);
    }
    setIsFetchingCountries(false);
  };

  return { countries, isFetchingCountries, getCountries };
};
