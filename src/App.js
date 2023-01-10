import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { BusinessCampaigns } from './components/Business/businessCampaigns/businessCampaigns.component';
import { BuyerForm } from './components/User/buyerForm/buyerForm.component';
import { CampaignProductsForBusinessRep } from './components/Business/campaignProductsForBusinessRep/campaignProductsForBusinessRep.component';
import { DonateProducts } from './components/Business/donateProducts/donateProducts.component';
import { HomePage } from './components/General/homePage/homePage.component';
import { ListOfOrders } from './components/Business/listOfOrders/listOfOrders.component';
import { LoginPage } from './components/General/loginPage/loginPage.component';
import { NonProfitAssociations } from './components/Nonprofit/nonProfitAssociations/nonProfitAssociations.component';
import { PageNotFound } from './components/General/pageNotFound/pageNotFound.component';
import { PersonalCampaigns } from './components/Nonprofit/personalCampaigns/personalCampaigns.component';
import { RegisterCampaign } from './components/Nonprofit/registerCampaign/registerCampaign.component';
import { UpdateCampaign } from './components/Nonprofit/updateCampaign/updateCampaign.component';
import { UpdateProduct } from './components/Business/updateProduct/updateProduct.component';
import { UsersCampaignProducts } from './components/User/usersCampaignProducts/usersCampaignProducts.component';
import { ProductsListContext } from './context/listOfProducts';
import { ProductIdContext } from './context/productID.context';
import { RoleContext } from './context/role.context';
import { Dashboard } from './layout/dashboard.layout';
import { Wallet } from './components/User/wallet/wallet.component';
import { WalletContext } from './context/wallet';
import { TwitterWalletContext } from './context/twitterWallet';
import { TwitterPoints } from './components/Activist/twitterPoints/twitterPoints.component';
import { RegisterCompany } from './components/Business/registerCompany/registerCompany.component';
import { PurchaseWithPoints } from './components/Activist/purchaseWithPoints/purchaseWithPoints.component';

function App() {
  const [role, setRole] = useState([]);
  const [productId, setProductId] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const { isAuthenticated, isLoading } = useAuth0();
  const [wallet, setWallet] = useState('');
  const [points, setPoints] = useState(0);

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
              <ProductsListContext.Provider
                value={{ productsList, setProductsList }}
              >
                <WalletContext.Provider value={{ wallet, setWallet }}>
                  <TwitterWalletContext.Provider value={{ points, setPoints }}>
                    <Dashboard></Dashboard>
                    <Routes>
                      <Route path='/' element={<HomePage></HomePage>}></Route>
                      <Route
                        path='/association'
                        element={
                          <NonProfitAssociations></NonProfitAssociations>
                        }
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
                      <Route
                        path='/usersProducts'
                        element={
                          <UsersCampaignProducts></UsersCampaignProducts>
                        }
                      ></Route>
                      <Route
                        path='/buyerForm'
                        element={<BuyerForm></BuyerForm>}
                      ></Route>
                      <Route
                        path='/listOfOrders'
                        element={<ListOfOrders></ListOfOrders>}
                      ></Route>
                      <Route path='/wallet' element={<Wallet></Wallet>}></Route>
                      <Route
                        path='/pointes'
                        element={<TwitterPoints></TwitterPoints>}
                      ></Route>
                      <Route
                        path='/registerCompany'
                        element={<RegisterCompany></RegisterCompany>}
                      ></Route>
                      <Route
                        path='/purchaseWithPoints'
                        element={<PurchaseWithPoints></PurchaseWithPoints>}
                      ></Route>
                      <Route
                        path='*'
                        element={<PageNotFound></PageNotFound>}
                      ></Route>
                    </Routes>
                  </TwitterWalletContext.Provider>
                </WalletContext.Provider>
              </ProductsListContext.Provider>
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
