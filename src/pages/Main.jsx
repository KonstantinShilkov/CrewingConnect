import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import Contacts from './Contacts';
import Vacancies from './vacancies/Vacancies';
import Login from './login/Login';
import Register from './register/Register';
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/user-context';

function Main() {

    const { isAuth } = useContext(UserContext)
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (isAuth) {
    //         return navigate("/vacancies")
    //     }
    //     else {
    //         navigate("/login")
    //     }
    // }, [isAuth])

    return (
        <div className='container'>
            <Header />
            <div className='app-wrapper-content'>
                <Routes>
                    <Route path="/" element={<Navigate to="/vacancies" replace />} />
                    <Route path="/vacancies" element={<Vacancies />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<div>404 NOT FOUND</div>} />
                </Routes>
            </div>
        </div>
    );
}

export default Main;

