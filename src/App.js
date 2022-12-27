import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import { LoginPage } from './components/loginPage/loginPage.component';
import { Dashboard } from './layout/dashboard.layout';

function App() {
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
      return <Dashboard></Dashboard>;
    } else {
      return <LoginPage></LoginPage>;
    }
  }
}

export default App;
