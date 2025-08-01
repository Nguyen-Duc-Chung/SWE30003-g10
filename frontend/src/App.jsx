/**
 * Project Group 10 
 * Long Chau Pharmacy Management System (LC-PMS)
 * Assignment: SWE30003 - Case Study Implementation
 * 
 * Coding Standard: Airbnb JavaScript Style Guide
 * Reference: https://airbnb.io/javascript/
 * 
 * This project follows the Airbnb JavaScript Style Guide to ensure
 * consistency, readability, and maintainability in code structure.
 */


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
  // console.log(user?.role)
   
  return (
    <>
    {/* bg-[linear-gradient(90deg,_#b0e9fb_0%,_#fbd2e0_50%,_#d7b5ff_100%)] */}
    <div className=" min-h-screen  text-white relative overflow-hidden ">
      <div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0'>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(245,249,252,255)_45%,rgba(0,0,0,0.1)_100%)]' />
				</div>
			</div>

      <div className="relative z-50 pt-20">
          <Navbar/>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/signup' element={ !user ? <SignUpPage/> : <Navigate to='/'/>} />
            <Route path='/login' element={ !user ? <LoginPage/>  : <Navigate to='/' /> } />

            {/*  ✅✅✅✅ NEW CODE */}
            <Route path='/secret-dashboard' element={ 
              (user?.role === "Admin" || 
               user?.role === "Pharmacists" || 
               user?.role === "Product_Manager" || 
               user?.role === "Cashiers") 
                ? < AdminPage /> 
                : <Navigate to='/login' /> } 
            />
                                                      
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
          <footer className="">
              <div className=" bg-[#001543]  py-4 text-gray-400">
                <div className="container px-4 mx-auto">

                    <div className="-mx-4 flex flex-wrap justify-between">

                      <div className="px-4 my-4 w-full xl:w-1/5">
                        <a href="/" className="block w-56 mb-10">
                          <svg version="1.1" viewBox="0 0 3368 512" xmlns="http://www.w3.org/2000/svg">
                            <g className="fill-none">
                              <g transform="translate(0 -75)">

                                <text className ="fill-white font-bold text-[512px] font-nunito" >
                                  <tspan x="654" y="518">Long Châu</tspan>
                                </text>
                              </g>
                            </g>
                          </svg>
                
                        </a>
                        <p className="text-justify">
                          Tất cả các Nhà thuốc trực thuộc hệ thống đều đạt chuẩn 
                          Thực hành thuốc tốt – GPP, với đội ngũ dược sĩ có chuyên môn và giàu kinh nghiệm.
                          Tất cả thuốc và sản phẩm tại chuỗi nhà thuốc FPT Long Châu đều được nhập từ chính hãng,
                          được kiểm soát chất lượng theo quy trình chặt chẽ và bán đúng với giá niêm yết.
                        </p>
                      </div>

                      <div className="px-4 my-4 w-full sm:w-auto">
                        <div>
                          <h2 class="inline-block text-2xl pb-4 mb-4 border-b-4 border-blue-600">Về Long Châu</h2>
                        </div>
                        <ul class="leading-8">
                          <li><a href="#" class="hover:text-blue-400">Giới thiệu</a></li>
                          <li><a href="#" class="hover:text-blue-400">Hệ thống cửa hàng</a></li>
                          <li><a href="#" class="hover:text-blue-400">Giấy phép kinh doanh</a></li>
                          <li><a href="#" class="hover:text-blue-400">Quy chế hoạt động</a></li>
                          <li><a href="#" class="hover:text-blue-400">Chính sách đổi trả và bảo hành</a></li>
                          <li><a href="#" class="hover:text-blue-400">Chính sách giao hàng</a></li>
                          <li><a href="#" class="hover:text-blue-400">Chính sách bảo mật</a></li>
                          <li><a href="#" class="hover:text-blue-400">Chính sách nội dung</a></li>
                          <li><a href="#" class="hover:text-blue-400">Chính sách bảo vệ dữ liệu cá nhân</a></li>
                          <li><a href="#" class="hover:text-blue-400">Chính sách thanh toán</a></li>
                        </ul>
                      </div>
                      <div className="px-4 my-4 w-full sm:w-auto">
                        <div>
                          <h2 class="inline-block text-2xl pb-4 mb-4 border-b-4 border-blue-600">Danh mục</h2>
                        </div>
                        <ul class="leading-8">
                          <li><a href="#" class="hover:text-blue-400">Thuốc</a></li>
                          <li><a href="#" class="hover:text-blue-400">Tra cứu bệnh</a></li>
                          <li><a href="#" class="hover:text-blue-400">Thực phẩm bảo vệ sức khỏe</a></li>
                          <li><a href="#" class="hover:text-blue-400">Chăm sóc cá nhân</a></li>
                          <li><a href="#" class="hover:text-blue-400">Mẹ và Bé</a></li>
                          <li><a href="#" class="hover:text-blue-400">Chăm sóc sắc đẹp</a></li>
                          <li><a href="#" class="hover:text-blue-400">Thiết bị y tế</a></li>
                          <li><a href="#" class="hover:text-blue-400">Sản phẩm tiện lợi</a></li>
                          <li><a href="#" class="hover:text-blue-400">Doanh nghiệp</a></li>
                          <li><a href="#" class="hover:text-blue-400">Nhãn hàng Pharmacity</a></li>
                        </ul>
                      </div>
                      <div className="px-4 my-4 w-full sm:w-auto xl:w-1/5">
                        <div>
                          <h2 className="inline-block text-2xl pb-4 mb-4 border-b-4 border-blue-600">Kết nối với chúng tôi</h2>
                        </div>
                        <a href="#" className="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
                          <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                            <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                          </svg>
                        </a>
                        <a href="#" className="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
                          <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                          </svg>
                        </a>
                        <a href="#" className="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
                          <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                          </svg>
                        </a>
                        <a href="#" className="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
                          <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                          </svg>
                        </a>
                        <a href="#" className="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full hover:text-blue-400 hover:border-blue-400">
                          <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
                          </svg>
                        </a>
                      </div>

                      <div className="px-4 my-4 w-full sm:w-auto xl:w-1/5">
                        <div>
                          <h2 className="inline-block text-2xl pb-4 mb-4 font-semibold">Hỗ trợ thanh toán</h2>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" class="w-10 h-auto"/>
                          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" class="w-10 h-auto"/>
                          <img src="https://upload.wikimedia.org/wikipedia/commons/4/40/JCB_logo.svg" alt="JCB" class="w-12 h-auto"/>  
                          <img src="https://developers.momo.vn/v3/assets/images/transparent-background-logo-138ebf0ffca865ec0f1a7d9c1e4a9f3c.png" alt="MoMo" class="w-10 h-auto"/>
                          <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png" alt="ZaloPay" class="w-10 h-auto"/>
                          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple Pay" class="w-8 h-auto"/>
                        </div>
                      </div>

                    </div>

                </div>
              </div>
          </footer>
       </div>
       <Toaster />
    </div>
    </>
  )
}

export default App