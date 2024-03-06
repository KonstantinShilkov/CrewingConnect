import React, { useContext } from 'react';
import Input from '@mui/joy/Input';
import { Button } from '@mui/joy';
import s from './Register.module.css'
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../context/user-context';


const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { onSignUp } = useContext(UserContext)

    return (
        <div className={s.mainContainer}>
            <form onSubmit={handleSubmit(onSignUp)}>
                <div className={s.emailContainer}>
                    <Input
                        {...register('email', {
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
                    <p>{errors.password1?.message}</p>

                </div>
                <div className={s.registerContainer}>
                    <Button
                        type='submit'
                        size="lg"
                        variant="solid"
                        color="neutral"
                        fullWidth
                    >
                        Registration
                    </Button>
                </div>
                <div className={s.loginContainer}>
                    <div className={s.questionText}> Have an accaount?</div>
                    <div className={s.loginText}>
                        <nav>
                            <NavLink className={s.login} to="/login">Login</NavLink>
                        </nav>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register
