import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
  	const [email, setEmail] = useState("");
	  const [password, setPassword] = useState("");

    const { login, loading } = useUserStore();

  	const handleSubmit = (e) => {
      e.preventDefault();
      // console.log(`LoginPage: ${email}, ${password} `);
      login(email, password);
	  };

  return (
    <>
    <div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-gray-800  py-8 px-4 shadow sm:rounded-lg sm:px-10 '>
        <h2 className='my-6 text-center text-3xl font-extrabold text-[#88D9F2] '>Đăng nhập Tài khoản của bạn</h2>
          <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                  <label htmlFor='email' className='block text-sm font-medium text-gray-300'>
                    Địa Chỉ Email 
                  </label>
                  <div className='mt-1 relative rounded-md shadow-sm'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <Mail className='h-5 w-5 text-gray-400' aria-hidden='true' />
                    </div>
                    <input
                      id='email'
                      type='email'
                      value={email}
									    onChange={(e) => setEmail(e.target.value)}
                      className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm'
                      placeholder='you@example.com'
                    />
                  </div>
              </div>

              <div>
                  <label htmlFor='password' className='block text-sm font-medium text-gray-300'>
                    Mật Khẩu
                  </label>
                  <div className='mt-1 relative rounded-md shadow-sm'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
                    </div>
                    <input
                      id='password'
                      type='password'
                      value={password}
									    onChange={(e) => setPassword(e.target.value)}
                      className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm'
                      placeholder='••••••••'
                      
                    />
                  </div>
              </div>

              						<button
							type='submit'
							className='w-full flex justify-center py-2 px-4 border border-transparent 
							rounded-md shadow-sm text-sm font-medium text-white bg-[#52b0cd] hover:bg-[#6dc0d8] focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-emerald-500 transition duration-250 ease-in-out disabled:opacity-50'
							disabled={loading}
						>
							{loading ? (
								<>
									<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
									Đang tải...
								</>
							) : (
								<>
									<LogIn className='mr-2 h-5 w-5' aria-hidden='true' />
									Đăng Nhập
								</>
							)}
						</button>

          </form>
          
					<p className='mt-8 text-center text-sm text-gray-400'>
						Không phải thành viên?{" "}
						<Link to='/signup' className='font-medium text-[#52b0cd] hover:text-[#6dc0d8]'>
							Đăng ký ngay <ArrowRight className='inline h-4 w-4' />
						</Link>
					</p>
        </div>

    </div>
    </>
  )
}

export default LoginPage