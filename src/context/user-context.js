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
      getCurrentUserData(currentUserUid);
      // navigate('/vacancies');
      navigate('profile/maininfo');
      reset();
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

  const logout = () => {
    signOut(auth)
      .then(() => {
        setIsAuth(false);
        navigate('/login');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const updateMainInfoData = async data => {
    try {
      const userDoc = doc(db, 'users', currentUserUid);
      await updateDoc(userDoc, { name: data.name, surname: data.surname, middleName: data.middleName });
      getCurrentUserData(currentUserUid);
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
    currentUserData,
    getCurrentUserData,
    currentUserUid,
    isFetching,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
