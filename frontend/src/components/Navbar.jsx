import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';
import { useCartStore } from '../stores/useCartStore';
import { useLocation } from 'react-router-dom';
import '../style/navbar.css'


const dropdownData = [
  {
    title: 'Vitamin & Khoáng chất',
    className: 'dropdown',
    links: [
      {
        spec_medicine: 'Vitamin tổng hợp',
        href: '/Vitamin tổng hợp',
      },
      {
        spec_medicine: 'Bổ sung Canxi & Vitamin D',
        href: '/Bổ sung Canxi Vitamin D',
      },
      {
        spec_medicine: 'Bổ sung Kẽm & Magie',
        href: '/Bổ sung Kẽm Magie',
      },
    ],
  },
  {
    title: 'Thuốc kháng sinh, kháng nấm',
    className: 'dropdown',
    links: [
      {
        spec_medicine: 'Thuốc trị giun sán',
        href: '/Thuốc trị giun sán',
      },
      {
        spec_medicine: 'Siro kháng sinh',
        href: '/Siro kháng sinh',
      },
      {
        spec_medicine: 'Thuốc trị sốt rét',
        href: '/Thuốc trị sốt rét',
      },
    ],
  },
  {
    title: 'Thuốc tim mạch & máu',
    className: 'dropdown',
    links: [
      {
        spec_medicine: 'Thuốc tim mạch huyết áp',
        href: '/Thuốc tim mạch huyết áp',
      },
      {
        spec_medicine: 'Thuốc cầm máu',
        href: '/Thuốc cầm máu',
      },
      {
        spec_medicine: 'Thuốc trị mỡ máu',
        href: '/Thuốc trị mỡ máu',
      },
    ],
  },
  {
    title: 'Thần kinh não',
    className: 'dropdown',
    links: [
      {
        spec_medicine: 'Tuần hoàn máu',
        href: '/Tuần hoàn máu',
      },
      {
        spec_medicine: 'Hoạt huyết',
        href: '/Hoạt huyết',
      },
      {
        spec_medicine: 'Bổ não',
        href: '/Bổ não',
      },
    ],
  },
];

const Navbar = () => {

    const {user, logout} = useUserStore();
    const isAdmin = user?.role === "admin";
    // console.log(user)
    const { cart } = useCartStore();
    const location = useLocation();
    const pathname = location.pathname;

  return (
    <header className='fixed top-0 left-0 w-full  bg-opacity-90 backdrop-blur-md shadow-lg
     z-40 transition-all duration-300 ' >

    <div className="container main_con mx-auto px-4 py-3">
       <div className=' spec_con flex flex-wrap justify-between items-center' >
            <Link to='/' className='text-5xl font-black text-[#2a4427] items-center space-x-2 flex'
            style={{ fontFamily: "'Noto Serif', serif" }}
            >
                Long Chau
            </Link>

            <nav className='flex flex-wrap items-center gap-4' >
                <Link to={"/"}	className='text-black hover:text-emerald-400 transition duration-300 ease-in-out'
                >Home
                </Link>

                {user && (
                    <Link
                    to={"/cart" } 
                    className='relative group text-black hover:text-emerald-400 transition duration-300 ease-in-out '
                    >
                        <ShoppingCart className='inline-block mr-1 group-hover:text-emerald-400' size={20} />
                        <span className='hidden sm:inline'>Cart</span>
                    { cart.length > 0 && <span  
                            className='absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 
                                        text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out'
                        >
                            {cart.length}
                        </span>}
                    </Link>
                )}
                {isAdmin && (
                    <Link 
                        className='bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium
                        transition duration-300 ease-in-out flex items-center' 
                        to={"/secret-dashboard"}
                        >
                            <Lock className='inline-block mr-1' size={18} />
                            <span className='hidden sm:inline'>Dashboard</span>
                        </Link>
                )}

                {user ? (
                    <button className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
                    rounded-md flex items-center transition duration-300 ease-in-out'
                    onClick={logout}
                    >
                        <LogOut size={18} />
                        <span className='hidden sm:inline ml-2'>Log Out</span>
                    </button>

                ) : (
                    <>
                        <Link 
                        to={"/signup"}  
                        className='bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 
                                        rounded-md flex items-center transition duration-300 ease-in-out'
                        >
                        <UserPlus className='mr-2' size={18} />
                        Sign Up
                        </Link>
                        <Link 
                        to={"/login"}  
                        className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
                                        rounded-md flex items-center transition duration-300 ease-in-out'
                        >
                        <LogIn className='mr-2' size={18} />
                        Log In
                        </Link>
                    </>
                )}

            </nav>

       </div>
    </div>  

        { pathname !== "/signup" && pathname !== "/login" &&  ( // Or use this:  !["/signup", "/login"].includes(pathname) &&

        <div className=" filter_con w-full mt-[5px] bg-white " >

            {dropdownData.map((dropdown, index) => (
                    <div className={`${dropdown.className } relative inline-block font-semibold text-black `} key={index} >
                        <div 
                          className='dropbtn  p-[5px] mx-[10px] rounded-lg text-center cursor-pointer ' > 
                            {dropdown.title} 
                        </div>
                        <div className="dropdown_content" >
                            {dropdown.links.map((link, idx) => (
                                <Link className="link" to={"/specific_Category" + link.href} key={idx}>
                                {link.spec_medicine}
                                </Link>
                            ))}
                        </div>

                    </div>
            ))}

        </div>

    )} 
    </header>

    
  )
}

export default Navbar