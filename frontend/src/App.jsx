import { Navigate , Route, Routes } from "react-router-dom"

import HomePage from "./pages/HomePage.jsx" ;
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import CategoryPage from './pages/CategoryPage.jsx';
import CartPage from './pages/CartPage.jsx';
import PurchaseSuccessPage from './pages/PurchaseSuccessPage.jsx';
import PurchaseCancelPage from './pages/PurchaseCancelPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import PrescriptionPage from './pages/PrescriptionPage.jsx';
import PaymentPage from "./pages/PaymentPage.jsx";

import Navbar from "./components/Navbar.jsx";
import { Toaster } from 'react-hot-toast';
import { useUserStore } from './stores/useUserStore.js';
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import { useCartStore } from "./stores/useCartStore.js";



function App() {

  const { user, checkAuth, checkingAuth } = useUserStore();
  const {getCartItems} = useCartStore();

  useEffect(()=> {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if(!user) return;

    getCartItems();
  }, [getCartItems, user]);

  if (checkingAuth) return <LoadingSpinner/>;
   
  return (
    <>
    <div className=" min-h-screen  text-white relative overflow-hidden bg-[linear-gradient(90deg,_#b0e9fb_0%,_#fbd2e0_50%,_#d7b5ff_100%)]">
      <div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0'>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
				</div>
			</div>

      <div className="relative z-50 pt-20">
          <Navbar/>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/signup' element={ !user ? <SignUpPage/> : <Navigate to='/'/>} />
            <Route path='/login' element={ !user ? <LoginPage/>  : <Navigate to='/' /> } />
            <Route path='/secret-dashboard' element={ user?.role === "admin" || user?.role === "pharmacists"  ? < AdminPage /> : <Navigate to='/login' /> } />
            <Route path='/category/:category' element= { <CategoryPage /> } />
            <Route path='/specific_Category/:specCategory' element= { <CategoryPage /> } />
            <Route path='/productDetail/:id' element= { <ProductDetailPage/> } />
            <Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
            <Route
						  path='/purchase-success' element={user ? <PurchaseSuccessPage /> : <Navigate to='/login' />}
					  />
            <Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />

            <Route path='/prescription' element={ <PrescriptionPage/> } />
            <Route path='/payment' element={ <PaymentPage/> } />

          </Routes>
       </div>
       <Toaster />
    </div>
    </>
  )
}

export default App