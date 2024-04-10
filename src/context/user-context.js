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
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
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
      // console.log(user);
      setIsAuth(true);
      setDoc(doc(db, 'users', user.uid), {
        email: user.email,
      });
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

  const updateMainInfoData = async data => {
    const userDoc = doc(db, 'users', currentUserUid);
    try {
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

  const updateVisasData = async data => {
    const userVisas = collection(db, 'users', currentUserUid, 'visas');
    const newVisaId = doc(userVisas);
    try {
      await setDoc(newVisaId, {
        id: newVisaId.id,
        visaType: data.visaType ? data.visaType : '',
        visaCountry: data.visaCountry ? data.visaCountry : '',
        visaValidDate: data.visaValidDate ? data.visaValidDate : '',
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

  const deleteVisaData = async visaId => {
    try {
      const userVisas = collection(db, 'users', currentUserUid, 'visas');
      const visaDoc = doc(userVisas, visaId);
      await deleteDoc(visaDoc);
      getCurrentUserData(currentUserUid);
      enqueueSnackbar('Deleted');
      reset();
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const updatePassportsData = async data => {
    const userPassports = collection(db, 'users', currentUserUid, 'passports');
    const newPassportId = doc(userPassports);
    try {
      await setDoc(newPassportId, {
        id: newPassportId.id,
        nationality: data.nationality ? data.nationality : '',
        number: data.number ? data.number : '',
        placeIssues: data.placeIssues ? data.placeIssues : '',
        dateIssues: data.dateIssues ? data.dateIssues : '',
        expireDate: data.expireDate ? data.expireDate : '',
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

  const deletePassportData = async passportId => {
    try {
      const userPassports = collection(db, 'users', currentUserUid, 'passports');
      const passportDoc = doc(userPassports, passportId);
      await deleteDoc(passportDoc);
      getCurrentUserData(currentUserUid);
      enqueueSnackbar('Deleted');
      reset();
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const getCurrentUserData = async userId => {
    try {
      const userDoc = doc(db, 'users', userId);
      const userVisas = collection(userDoc, 'visas');
      const userPassports = collection(userDoc, 'passports');

      const userDocSnap = await getDoc(userDoc);
      const userVisasSnap = await getDocs(userVisas);
      const userPassportsSnap = await getDocs(userPassports);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const visas = userVisasSnap.docs.map(doc => ({ ...doc.data() }));
        const passports = userPassportsSnap.docs.map(doc => ({ ...doc.data() }));

        const updatedUserData = { ...userData, visas, passports };
        console.log(updatedUserData);
        setCurrentUserData(updatedUserData);
        setIsFetching(false);
        console.log(currentUserData);
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
    updateVisasData,
    deleteVisaData,
    updatePassportsData,
    deletePassportData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
