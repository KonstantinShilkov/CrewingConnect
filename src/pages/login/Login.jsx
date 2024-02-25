import React, { useContext, useEffect } from 'react';
import Input from '@mui/joy/Input';
import { Button } from '@mui/joy';
import s from './Login.module.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../context/user-context';

const Login = () => {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { onSignIn, isAuth } = useContext(UserContext)

    useEffect(() => {
        if (isAuth) {
            navigate("/vacancies")
        }
    })

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
                        fullWidth
                    >
                        Login
                    </Button>
                </div>
                <div>
                    <div className={s.registerContainer}>
                        <div className={s.questionText}>Dont't have an account?</div>
                        <div className={s.registerText}>
                            <nav>
                                <NavLink className={s.registration} to="/register">Registration</NavLink>
                            </nav>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login



