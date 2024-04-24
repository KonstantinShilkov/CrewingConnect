import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { UserContext } from '../../../context/user-context';

export const useProfileExperience = () => {
  const { currentUserData, isFetching } = useContext(UserContext);
  const [filteredExperience, setFilteredExperience] = useState([]);

  useEffect(() => {
    !isFetching &&
      setFilteredExperience(
        currentUserData.experience.reduce((acc, exp) => {
          const vesselType =
            exp.vesselType === 'LNG' || exp.vesselType === 'LPG' ? 'LNG/LPG' : exp.vesselType;
          const existingExp = acc.find(item => item.rank === exp.rank && item.vesselType === vesselType);
          if (existingExp) {
            existingExp.experienceInDays += exp.experienceInDays;
          } else {
            acc.push({ ...exp, vesselType });
          }
          return acc;
        }, [])
      );
  }, [currentUserData, isFetching]);
  return { filteredExperience, isFetching };
};
