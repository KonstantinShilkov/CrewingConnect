import { BrowserRouter } from 'react-router-dom';
import UserContextProvider from './context/user-context';
import { SnackbarProvider } from 'notistack';
import Main from './pages/Main';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider maxSnack={3}>
        <UserContextProvider>
          <Main />
        </UserContextProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
