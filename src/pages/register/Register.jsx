import React from 'react';
import Input from '@mui/joy/Input';
import { Button } from '@mui/joy';
import s from './Register.module.css'
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';


const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    return (
        <div className={s.mainContainer}>
            <form onSubmit={handleSubmit((data) => {
                console.log(data)
            })}>
                <div className={s.emailContainer}>
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
                </div>
                <div className={s.nameContainer}>
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
                            required: "Password is Requered"
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
                    <div><p> Have an accaount?</p></div>
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
