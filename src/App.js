import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { BusinessCampaigns } from './components/businessCampaigns/businessCampaigns.component';
import { CampaignProductsForBusinessRep } from './components/campaignProductsForBusinessRep/campaignProductsForBusinessRep.component';
import { DonateProducts } from './components/donateProducts/donateProducts.component';
import { HomePage } from './components/homePage/homePage.component';
import { LoginPage } from './components/loginPage/loginPage.component';
import { NonProfitAssociations } from './components/nonProfitAssociations/nonProfitAssociations.component';
import { PageNotFound } from './components/pageNotFound/pageNotFound.component';
import { PersonalCampaigns } from './components/personalCampaigns/personalCampaigns.component';
import { RegisterCampaign } from './components/registerCampaign/registerCampaign.component';
import { UpdateCampaign } from './components/updateCampaign/updateCampaign.component';
import { UpdateProduct } from './components/updateProduct/updateProduct.component';
import { ProductIdContext } from './context/productID.context';
import { RoleContext } from './context/role.context';
import { Dashboard } from './layout/dashboard.layout';

function App() {
  const [role, setRole] = useState([]);
  const [productId, setProductId] = useState([]);
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
            <ProductIdContext.Provider value={{ productId, setProductId }}>
              <Dashboard></Dashboard>
              <Routes>
                <Route path='/' element={<HomePage></HomePage>}></Route>
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
                <Route
                  path='/updateCampaign'
                  element={<UpdateCampaign></UpdateCampaign>}
                ></Route>
                <Route
                  path='/AllCampaignsForBusiness'
                  element={<BusinessCampaigns></BusinessCampaigns>}
                ></Route>
                <Route
                  path='/DonateProduct'
                  element={<DonateProducts></DonateProducts>}
                ></Route>
                <Route
                  path='/BusinessRepProducts'
                  element={
                    <CampaignProductsForBusinessRep></CampaignProductsForBusinessRep>
                  }
                ></Route>
                <Route
                  path='/updateProduct'
                  element={<UpdateProduct></UpdateProduct>}
                ></Route>
                <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
              </Routes>
            </ProductIdContext.Provider>
          </RoleContext.Provider>
        </>
      );
    } else {
      return <LoginPage></LoginPage>;
    }
  }
}

export default App;
