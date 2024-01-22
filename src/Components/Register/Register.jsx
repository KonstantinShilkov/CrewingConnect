import React from 'react';
import Input from '@mui/joy/Input';
import { Button } from '@mui/joy';
import s from './Register.module.css'

const Register = () => {
    return (
 <div className={s.mainContainer}>
            <div className={s.nameContainer}>
                <Input 
                placeholder='Type Your Name'
                color="neutral"
                size="sm"
                variant="soft"
                />
            </div>
            <div className={s.emailContainer}>
                <Input 
                placeholder='Type Your Email'
                color="neutral"
                size="sm"
                variant="soft"
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
            <div className={s.passwordContainer}>
                <Input 
                placeholder='Repeat Your Password'
                color="neutral"
                size="sm"
                variant="soft"
                type='password'
                />
            </div>
            <div className={s.registerContainer}>
                <Button 
                size="sm"
                variant="solid"
                color="neutral"
                fullWidth="auto"
                >
                    Registration
                </Button>
            </div> 
            </div>
    )
}

export default Register