import { createContext, useState } from 'react';
import { auth } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { db } from '../config/firebase';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { calculateAge } from '../utils';

const initialData = {
  isAuth: false,
};

export const UserContext = createContext(initialData);

function UserContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState([false]);
  const navigate = useNavigate();
  const { reset } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const vacanciesCollectionRef = collection(db, 'vacancies');
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [currentUserUid, setCurrentUserUid] = useState(null);
  const [currentUserData, setCurrentUserData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const onAuthState = () => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setCurrentUserEmail(user.email);
        setCurrentUserUid(user.uid);
        setIsAuth(true);
        // getCurrentUserData(user.uid);
      } else {
        setIsAuth(false);
      }
    });
  };

  const onSignIn = async data => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      setIsAuth(true);
      getCurrentUserData(currentUserUid);
      navigate('/vacancies');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/invalid-credential') {
        enqueueSnackbar('Incorrect email or password');
      } else if (errorCode === 'auth/too-many-requests') {
        enqueueSnackbar('too many requests, try later');
      } else if (errorCode === 'auth/invalid-email') {
        enqueueSnackbar('invalid email format');
      } else {
        enqueueSnackbar(errorCode, errorMessage);
      }
    }
  };

  const onSignUp = async data => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      console.log(user);
      setIsAuth(true);
      setDoc(doc(db, 'users', user.uid), {
        email: user.email,
      });

      // getCurrentUserData(currentUserUid);
      // navigate('/vacancies');
      // console.log(currentUserData);
      reset();

      navigate('profile/edit/maininfo');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/email-already-in-use') {
        enqueueSnackbar('email already exists');
      } else if (errorCode === 'auth/invalid-email') {
        enqueueSnackbar('invalid email format');
      } else {
        enqueueSnackbar(errorCode, errorMessage);
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setIsAuth(false);
      navigate('/login');
      setCurrentUserData([]);
      console.log(currentUserData);
    } catch (error) {
      console.log(error);
    }
  };

  // const calculateAge = dateOfBirth => {
  //   const today = new Date();
  //   const birthDate = new Date(dateOfBirth);
  //   let age = today.getFullYear() - birthDate.getFullYear();
  //   const monthDiff = today.getMonth() - birthDate.getMonth();

  //   if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
  //     age--;
  //   }

  //   return age;
  // };

  const updateMainInfoData = async data => {
    try {
      const userDoc = doc(db, 'users', currentUserUid);
      await updateDoc(userDoc, {
        name: data.name ? data.name : '',
        surname: data.surname ? data.surname : '',
        middleName: data.middleName ? data.middleName : '',
        dateOfBirth: data.dateOfBirth ? data.dateOfBirth : '',
        age: calculateAge(data.dateOfBirth) ? calculateAge(data.dateOfBirth) : '',
        placeOfBirth: data.placeOfBirth ? data.placeOfBirth : '',
        nationality: data.nationality ? data.nationality : '',
        presentRank: data.presentRank ? data.presentRank : '',
        rankApplied: data.rankApplied ? data.rankApplied : '',
        availableDate: data.availableDate ? data.availableDate : '',
        vesselType: data.vesselType ? data.vesselType : '',
      });
      getCurrentUserData(currentUserUid);
      enqueueSnackbar('Saved');
      reset();
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const updateContactsData = async data => {
    try {
      const userDoc = doc(db, 'users', currentUserUid);
      await updateDoc(userDoc, {
        mobPhone: data.mobPhone ? data.mobPhone : '',
        homeAddress: data.homeAddress ? data.homeAddress : '',
        nearestAirport: data.nearestAirport ? data.nearestAirport : '',
      });
      getCurrentUserData(currentUserUid);
      enqueueSnackbar('Saved');
      reset();
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const getCurrentUserData = async userId => {
    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCurrentUserData(docSnap.data());
        setIsFetching(false);
        console.log(docSnap.data());
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const value = {
    isAuth,
    onSignIn,
    onSignUp,
    logout,
    onAuthState,
    vacanciesCollectionRef,
    currentUserEmail,
    updateMainInfoData,
    updateContactsData,
    currentUserData,
    getCurrentUserData,
    currentUserUid,
    isFetching,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
