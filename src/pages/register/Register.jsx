import React from 'react';
import Input from '@mui/joy/Input';
import { Button } from '@mui/joy';
import s from './Register.module.css'
import { useForm } from 'react-hook-form';


const Register = () => {
const {register, handleSubmit} = useForm()

    return (
 <div className={s.mainContainer}>
    <form onSubmit={handleSubmit((data)=>{
        console.log(data)
    })}>
            <div className={s.nameContainer}>
                <Input 
                {...register('firstName')}
                placeholder='Type Your Name'
                color="neutral"
                size="sm"
                variant="soft"
                />
            </div>
            <div className={s.emailContainer}>
                <Input 
                {...register('email')}
                placeholder='Type Your Email'
                color="neutral"
                size="sm"
                variant="soft"
                />
            </div>
            <div className={s.passwordContainer}>
                <Input 
                {...register('password1')}
                placeholder='Type Your Password'
                color="neutral"
                size="sm"
                variant="soft"
                type='password'
                />
            </div>
            <div className={s.passwordContainer}>
                <Input 
                {...register('password2')}
                placeholder='Repeat Your Password'
                color="neutral"
                size="sm"
                variant="soft"
                type='password'
                />
            </div>
            <div className={s.registerContainer}>
                <Button 
                type='submit'
                // size="sm"
                variant="solid"
                color="neutral"
                fullWidth="auto"
                >
                    Registration
                </Button>
            </div> 
            </form>
            </div>
    )
}

export default Register