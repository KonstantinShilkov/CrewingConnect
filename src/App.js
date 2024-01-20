import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Contacts from './Components/Contacts';
import Vacancies from './Components/Vacancies';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  return ( 
    <BrowserRouter>
    <div className='container'>
      <div className='app-wrapper'>
      <Header  />
      </div>
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
    </BrowserRouter>
  );
}

export default App;
