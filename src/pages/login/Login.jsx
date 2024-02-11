import React from 'react';
import Input from '@mui/joy/Input';
import { Button } from '@mui/joy';
import s from './Login.module.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {
    const navigate = useNavigate();


    const onSignIn = async (data) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigate("/vacancies")
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(error.message)
                console.log(errorCode, errorMessage)
            });
    }

    const { register, handleSubmit, formState: { errors } } = useForm()

    return (
        <div className={s.mainContainer}>
            <form onSubmit={handleSubmit(onSignIn)}>

                <div className={s.emailContainer}>
                    <Input
                        {...register("email", {
                            required: "Email is Requered"
                        })}
                        placeholder='Type Your Email'
                        color="neutral"
                        size="lg"
                        variant="soft"
                        type='email'
                    />
                    <p>{errors.email?.message}</p>
                </div>
                <div className={s.passwordContainer}>
                    <Input
                        {...register("password", {
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
                    <p>{errors.password?.message}</p>
                </div>
                <div className={s.loginContainer}>
                    <Button size="lg"
                        type='submit'
                        variant="solid"
                        color="neutral"
                        fullWidth="auto"
                    >
                        Login
                    </Button>
                </div>
                <div>
                    {/* <div className={s.textContainer}>
                        Dont't have an account?
                    </div> */}
                    <div className={s.registerContainer}>
                        <div className={s.questionText}>Dont't have an account?</div>
                        <div>
                            <nav>
                                <NavLink className={s.item} to="/register">Registration</NavLink>
                            </nav>
                        </div>

                        {/* <Button
                            onClick={navigateToRegister}
                            size="lg"
                            variant="solid"
                            color="neutral"
                            fullWidth="auto"
                        >
                            Registration
                        </Button> */}
                    </div>
                </div>
            </form>
        </div>

    )
}

export default Login



