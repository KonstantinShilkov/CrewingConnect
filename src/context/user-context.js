import { createContext, useState } from "react";
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

const initialData = {
    isAuth: false
}

export const UserContext = createContext(initialData);

function UserContextProvider({ children }) {

    const [isAuth, setIsAuth] = useState([false])
    const navigate = useNavigate();
    const { reset } = useForm();
    const { enqueueSnackbar } = useSnackbar();

    const onAuthState = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setIsAuth(true)
            } else {
                setIsAuth(false)
            }
        });
    }

    const onSignIn = async (data) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate("/vacancies")
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/invalid-credential') {
                    enqueueSnackbar('Incorrect email or password')
                }
                else if (errorCode === 'auth/too-many-requests') {
                    enqueueSnackbar('too many requests, try later')
                }
                else if (errorCode === 'auth/invalid-email') {
                    enqueueSnackbar('invalid email format')
                }
                else {
                    enqueueSnackbar(errorCode, errorMessage)
                }
            });
    }

    const onSignUp = async (data) => {
        await createUserWithEmailAndPassword(auth, data.email, data.password1)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigate("/vacancies")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/email-already-in-use') {
                    enqueueSnackbar('email already exists')
                }
                else if (errorCode === 'auth/invalid-email') {
                    enqueueSnackbar('invalid email format')
                }
                else {
                    enqueueSnackbar(errorCode, errorMessage)
                }
            });
        reset()
    }

    const logout = () => {
        signOut(auth).then(() => {
            navigate("/login");
        }).catch((error) => {
            console.log(error)
        });
    }

    const value = {
        isAuth,
        onSignIn,
        onSignUp,
        logout,
        onAuthState
    }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextProvider

