import React from 'react';
import Input from '@mui/joy/Input';
import { Button } from '@mui/joy';
import s from './Login.module.css'
import { Navigate, useNavigate } from 'react-router-dom';

const redirect= () => {
    return (
<Navigate to="/login" />
    )
   } 

const Login = () => {
    const navigate = useNavigate();

    const navigateToRegister = () => {
      navigate('/register');
    };
   

    return (
        <div className={s.mainContainer}>
            <div className={s.emailContainer}>
                <Input 
                placeholder='Type Your Email'
                color="neutral"
                size="sm"
                variant="soft"
                type='email'
                />
            </div>
            <div className={s.passwordContainer}>
                <Input 
                placeholder='Type Your Password'
                color="neutral"
                size="sm"
                variant="soft"
                type='password'
                />
            </div>
            <div className={s.loginContainer}>
            <Button size="sm"
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
                size="sm"
                variant="solid"
                color="neutral"
                fullWidth="auto" 
                >
                    Registration
                </Button>
            </div>
            </div>
            </div>
    )
}

export default Login



