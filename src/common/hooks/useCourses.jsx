import { useState, useContext } from 'react';
import { UserContext } from '../../context/user-context';
import { getDoc } from 'firebase/firestore';

export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const { coursesCollectionRef } = useContext(UserContext);
  const [isFetchingCourses, setIsFetchingCourses] = useState(false);

  const getCourses = async () => {
    setIsFetchingCourses(true);
    try {
      const docSnap = await getDoc(coursesCollectionRef);
      if (docSnap.exists()) {
        const coursesData = docSnap.data().courses;
        setCourses(coursesData);
      } else {
        console.log('No such document!');
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
    setIsFetchingCourses(false);
  };

  return { courses, isFetchingCourses, getCourses };
};
