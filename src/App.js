import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { LoginPage } from './components/loginPage/loginPage.component';
import { NonProfitAssociations } from './components/nonProfitAssociations/nonProfitAssociations.component';
import { PageNotFound } from './components/pageNotFound/pageNotFound.component';
import { PersonalCampaigns } from './components/personalCampaigns/personalCampaigns.component';
import { RegisterCampaign } from './components/registerCampaign/registerCampaign.component';
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
            <Routes>
              <Route
                path='/association'
                element={<NonProfitAssociations></NonProfitAssociations>}
              ></Route>
              <Route
                path='/campaignRegistration'
                element={<RegisterCampaign></RegisterCampaign>}
              ></Route>
              <Route
                path='/personalCampaigns'
                element={<PersonalCampaigns></PersonalCampaigns>}
              ></Route>
              <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
            </Routes>
          </RoleContext.Provider>
        </>
      );
    } else {
      return <LoginPage></LoginPage>;
    }
  }
}

export default App;
