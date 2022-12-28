import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import './App.css';
import { LoginPage } from './components/loginPage/loginPage.component';
import { RoleContext } from './context/role.context';
import { Dashboard } from './layout/dashboard.layout';

function App() {
  const [role, setRole] = useState([]);
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return (
      <div className='App'>
        {' '}
        <h6>Loading...</h6>
      </div>
    );
  } else {
    if (isAuthenticated) {
      return (
        <>
          <RoleContext.Provider value={{ role, setRole }}>
            <Dashboard></Dashboard>
          </RoleContext.Provider>
        </>
      );
    } else {
      return <LoginPage></LoginPage>;
    }
  }
}

export default App;
