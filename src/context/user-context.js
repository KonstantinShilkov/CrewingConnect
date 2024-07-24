import { createContext, useState } from 'react';
import { auth, db, storage } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { calculateAge, calculateTotalExperienceInDays } from '../utils';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { courses } from '../utils/index'; // This import to be used in case to add a new group of courses to firebase. on the 110line a function

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
  const countriesCollectionRef = doc(db, 'commondata', 'countries');
  const coursesCollectionRef = doc(db, 'commondata', 'courses');
  const [avatar, setAvatar] = useState();

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
      setCurrentUserUid(null);
      setAvatar();
      console.log(currentUserData);
    } catch (error) {
      console.log(error);
    }
  };
  // In case to add some additional courses or change existing
  // uploadCourses to be used in case to add a new group of courses to firebase
  // const uploadCourses = async () => {
  //   try {
  //     await setDoc(coursesCollectionRef, { courses }); // Upload the courses array
  //     console.log('Courses uploaded successfully');
  //   } catch (error) {
  //     console.error('Error uploading courses:', error);
  //   }
  // };

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
    console.log(data);
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

  const updateLicensesData = async data => {
    const userLicenses = collection(db, 'users', currentUserUid, 'licenses');
    const newLicensesId = doc(userLicenses);
    try {
      await setDoc(newLicensesId, {
        id: newLicensesId.id,
        national: data.national ? data.national : '',
        gradeOfLicenses: data.gradeOfLicenses ? data.gradeOfLicenses : '',
        licenseType: data.licenseType ? data.licenseType : '',
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

  const deleteLicensesData = async licenseId => {
    try {
      const userLicenses = collection(db, 'users', currentUserUid, 'licenses');
      const licenseIdDoc = doc(userLicenses, licenseId);
      await deleteDoc(licenseIdDoc);
      getCurrentUserData(currentUserUid);
      enqueueSnackbar('Deleted');
      reset();
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const updateQualificationCertificatesData = async data => {
    const userQualifications = collection(db, 'users', currentUserUid, 'qualifications');
    const newQualificationId = doc(userQualifications);
    console.log(data);
    try {
      await setDoc(newQualificationId, {
        id: newQualificationId.id,
        qualificationCertificate: data.qualificationCertificate ? data.qualificationCertificate : '',
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

  const deleteQualificationCertificateData = async qualificationId => {
    try {
      const userQualifications = collection(db, 'users', currentUserUid, 'qualifications');
      const qualificationIdDoc = doc(userQualifications, qualificationId);
      await deleteDoc(qualificationIdDoc);
      getCurrentUserData(currentUserUid);
      enqueueSnackbar('Deleted');
      reset();
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const updateSeamanBooksData = async data => {
    const userSeamanBooks = collection(db, 'users', currentUserUid, 'seamanBooks');
    const newSeamanBookId = doc(userSeamanBooks);
    console.log(data);
    try {
      await setDoc(newSeamanBookId, {
        id: newSeamanBookId.id,
        national: data.national ? data.national : '',
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

  const deleteSeamanBookData = async seamanBookId => {
    try {
      const userSeamanBooks = collection(db, 'users', currentUserUid, 'seamanBooks');
      const seamanBookIdDoc = doc(userSeamanBooks, seamanBookId);
      await deleteDoc(seamanBookIdDoc);
      getCurrentUserData(currentUserUid);
      enqueueSnackbar('Deleted');
      reset();
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const updateExperienceData = async data => {
    const userExperience = collection(db, 'users', currentUserUid, 'experience');
    const newExperienceId = doc(userExperience);
    const experienceInDays = calculateTotalExperienceInDays(data.fromDate, data.tillDate);

    try {
      await setDoc(newExperienceId, {
        id: newExperienceId.id,
        vesselName: data.vesselName ? data.vesselName : '',
        typeTrade: data.typeTrade ? data.typeTrade : '',
        engineType: data.engineType ? data.engineType : '',
        vesselType: data.vesselType ? data.vesselType : '',
        companyName: data.companyName ? data.companyName : '',
        rank: data.rank ? data.rank : '',
        fromDate: data.fromDate ? data.fromDate : '',
        tillDate: data.tillDate ? data.tillDate : '',
        experienceInDays: experienceInDays ? experienceInDays : '',
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

  const deleteExperienceData = async experienceId => {
    try {
      const userExperience = collection(db, 'users', currentUserUid, 'experience');
      const experienceIdDoc = doc(userExperience, experienceId);
      await deleteDoc(experienceIdDoc);
      getCurrentUserData(currentUserUid);
      enqueueSnackbar('Deleted');
      reset();
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const updateCourseData = async data => {
    const userCourses = collection(db, 'users', currentUserUid, 'courses');
    const newCourseId = doc(userCourses);
    try {
      await setDoc(newCourseId, {
        id: newCourseId.id,
        courseAttended: data.courseAttended ? data.courseAttended : '',
        dateIssues: data.dateIssues ? data.dateIssues : '',
        expireDate: data.expireDate ? data.expireDate : '',
        remarks: data.remarks ? data.remarks : 'No remarks',
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
  const deleteCourseData = async courseId => {
    try {
      const userCourses = collection(db, 'users', currentUserUid, 'courses');
      const courseIdDoc = doc(userCourses, courseId);
      await deleteDoc(courseIdDoc);
      getCurrentUserData(currentUserUid);
      enqueueSnackbar('Deleted');
      reset();
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const uploadAvatar = async avatarUpload => {
    if (!avatarUpload || !currentUserUid) return;
    const avatarsFolderRef = ref(storage, `avatarsFolder/${currentUserUid}`);
    try {
      await uploadBytes(avatarsFolderRef, avatarUpload);
      getAvatar();
      enqueueSnackbar('Avatar uploaded successfully');
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Failed to upload avatar');
    }
  };

  const getAvatar = async () => {
    const avatarRef = ref(storage, `avatarsFolder/${currentUserUid}`);
    try {
      const avatarUrl = await getDownloadURL(avatarRef);
      setAvatar(avatarUrl);
    } catch (err) {
      console.error(err);
    }
  };

  const getCurrentUserData = async userId => {
    try {
      const userDoc = doc(db, 'users', userId);
      const userVisas = collection(userDoc, 'visas');
      const userPassports = collection(userDoc, 'passports');
      const userLicenses = collection(userDoc, 'licenses');
      const userQualifications = collection(userDoc, 'qualifications');
      const userSeamanBooks = collection(userDoc, 'seamanBooks');
      const userExperience = collection(userDoc, 'experience');
      const userCourses = collection(userDoc, 'courses');

      const userDocSnap = await getDoc(userDoc);
      const userVisasSnap = await getDocs(userVisas);
      const userPassportsSnap = await getDocs(userPassports);
      const userLicensesSnap = await getDocs(userLicenses);
      const userQualificationsSnap = await getDocs(userQualifications);
      const userSeamanBooksSnap = await getDocs(userSeamanBooks);
      const userExperienceSnap = await getDocs(userExperience);
      const userCoursesSnap = await getDocs(userCourses);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const visas = userVisasSnap.docs.map(doc => ({ ...doc.data() }));
        const passports = userPassportsSnap.docs.map(doc => ({ ...doc.data() }));
        const licenses = userLicensesSnap.docs.map(doc => ({ ...doc.data() }));
        const qualifications = userQualificationsSnap.docs.map(doc => ({ ...doc.data() }));
        const seamanBooks = userSeamanBooksSnap.docs.map(doc => ({ ...doc.data() }));
        const experience = userExperienceSnap.docs.map(doc => ({ ...doc.data() }));
        const courses = userCoursesSnap.docs.map(doc => ({ ...doc.data() }));

        const updatedUserData = {
          ...userData,
          visas,
          passports,
          licenses,
          qualifications,
          seamanBooks,
          experience,
          courses,
        };
        setCurrentUserData(updatedUserData);
        setIsFetching(false);
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
    updateLicensesData,
    deleteLicensesData,
    updateQualificationCertificatesData,
    deleteQualificationCertificateData,
    updateSeamanBooksData,
    deleteSeamanBookData,
    updateExperienceData,
    deleteExperienceData,
    updateCourseData,
    deleteCourseData,
    countriesCollectionRef,
    coursesCollectionRef,
    uploadAvatar,
    getAvatar,
    avatar,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
