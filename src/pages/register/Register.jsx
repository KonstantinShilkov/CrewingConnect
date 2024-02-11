import React from 'react';
import Input from '@mui/joy/Input';
import { Button } from '@mui/joy';
import s from './Register.module.css'
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../config/firebase'
import { addDoc, collection } from 'firebase/firestore';


const Register = () => {
    const navigate = useNavigate();


    const { register, reset, handleSubmit, formState: { errors } } = useForm()

    const onSignUp = async (data) => {
        await createUserWithEmailAndPassword(auth, data.email, data.password1)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                navigate("/login")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(error.message)
                console.log(errorCode, errorMessage);
                // ..
            });
        reset()
    }


    return (
        <div className={s.mainContainer}>
            <form onSubmit={handleSubmit(onSignUp)}>
                {/* <div className={s.nameContainer}>
                    <Input
                        {...register('firstName', {
                            required: "Name is Requered"
                        })}
                        placeholder='Type Your Name'
                        color="neutral"
                        size="lg"
                        variant="soft"
                    />
                    <p1>{errors.firstName?.message}</p1>
                </div> */}
                <div className={s.emailContainer}>
                    <Input
                        {...register('email', {
                            required: "Email is Requered"
                        })}
                        placeholder='Type Your Email'
                        color="neutral"
                        size="lg"
                        variant="soft"
                    />
                    <p1>{errors.email?.message}</p1>

                </div>
                <div className={s.passwordContainer}>
                    <Input
                        {...register('password1', {
                            required: "Password is Requered",
                            minLength: {
                                value: 6,
                                message: 'Min length 6'
                            }
                        })}
                        placeholder='Type Your Password'
                        color="neutral"
                        size="lg"
                        variant="soft"
                        type='password'
                    />
                    <p1>{errors.password1?.message}</p1>

                </div>
                {/* <div className={s.passwordContainer}>
                    <Input
                        {...register('password2')}
                        placeholder='Repeat Your Password'
                        color="neutral"
                        size="lg"
                        variant="soft"
                        type='password'
                    />
                </div> */}
                <div className={s.registerContainer}>
                    <Button
                        type='submit'
                        size="lg"
                        variant="solid"
                        color="neutral"
                        fullWidth="auto"
                    >
                        Registration
                    </Button>
                </div>
                <div className={s.loginContainer}>
                    <div> Have an accaount?</div>
                    <div>
                        <nav>
                            <NavLink className={s.item} to="/login">Login</NavLink>
                        </nav>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register
