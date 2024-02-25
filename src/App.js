import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Contacts from './pages/Contacts';
import Vacancies from './pages/Vacancies';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import UserContextProvider from './context/user-context';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider maxSnack={3}>
        <UserContextProvider >
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
        </UserContextProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
