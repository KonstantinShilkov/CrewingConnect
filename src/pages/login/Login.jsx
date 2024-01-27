import React from 'react';
import Input from '@mui/joy/Input';
import { Button } from '@mui/joy';
import s from './Login.module.css'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const navigate = useNavigate();

    const navigateToRegister = () => {
        navigate('/register');
    };

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = async (data) => {
        await createUserWithEmailAndPassword(auth, data.email, data.password)
    }

    return (
        <div className={s.mainContainer}>
            <form onSubmit={handleSubmit(onSubmit)}>

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
                                value: 4,
                                message: 'Min length 4'
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
                    <div className={s.textContainer}>
                        Dont't have an account?
                    </div>
                    <div className={s.registerContainer}>
                        <Button
                            onClick={navigateToRegister}
                            size="lg"
                            variant="solid"
                            color="neutral"
                            fullWidth="auto"
                        >
                            Registration
                        </Button>
                    </div>
                </div>
            </form>
        </div>

    )
}

export default Login



