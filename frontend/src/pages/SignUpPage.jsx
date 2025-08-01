import { use, useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";


const SignUpPage = () => {
  const [formData, setFormData] = useState(
    {
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  }
);

console.log("Password",formData.password);
console.log("Confirm Password", formData.confirmPassword);

const handleChange = (e) => {
  setFormData((prev)=>(
    {
    ...prev, [e.target.id]: e.target.value
    }
))
// ,console.log(e.target.value)
}
  const { signup, loading } = useUserStore()

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
    
  }

  return (
    <div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <motion.div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      
          <div className='bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <h2 className='my-6 text-center text-3xl font-extrabold text-[#88D9F2] '>Tạo Tài khoản của bạn</h2>
              <form onSubmit={handleSubmit} className='space-y-6'>

                <div>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-300'>
                      Họ và tên
                    </label>
                    <div className='mt-1 relative rounded-md shadow-sm'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                          <User className='h-5 w-5 text-gray-400' aria-hidden='true' />
                        </div>
                        <input
                          id='name'
                          type='text'
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm'
                          placeholder='Nhập tên của bạn'
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor='phoneNumber' className='block text-sm font-medium text-gray-300'>
                      Số điện thoại
                    </label>
                    <div className='mt-1 relative rounded-md shadow-sm'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                          <User className='h-5 w-5 text-gray-400' aria-hidden='true' />
                        </div>
                        <input
                          id='phoneNumber'
                          type='number'
                          required
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm'
                          placeholder='12345678'
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-300'>
                      Địa chỉ Email
                    </label>
                    <div className='mt-1 relative rounded-md shadow-sm'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                          <Mail className='h-5 w-5 text-gray-400' aria-hidden='true' />
                        </div>
                        <input
                          id='email'
									        type='email'
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm'
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor='password' className='block text-sm font-medium text-gray-300'>
                      Mật khẩu
                    </label>
                    <div className='mt-1 relative rounded-md shadow-sm'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                          <Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
                        </div>
                        <input
                          id='password'
									        type='password'
                          required
                          value={formData.password}
                          onChange={handleChange}
                          className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm'
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-300'>
                      Xâc nhận mật khẩu
                    </label>
                    <div className='mt-1 relative rounded-md shadow-sm'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                          <Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
                        </div>
                        <input
                          id='confirmPassword'
									        type='password'
                          required
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm'
                        />
                    </div>
                </div>

                <button
                  type='submit'
                  className='w-full flex justify-center py-2 px-4 border border-transparent 
                  rounded-md shadow-sm text-sm font-medium text-white
                  bg-[#52b0cd] hover:bg-[#6dc0d8] duration-250 '

                  disabled={loading}
                > 
                  {loading ? (
                    <>
                      <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                      Đang tải...
                    </>
                  ) : (
                    <>
                      <UserPlus className='mr-2 h-5 w-5' aria-hidden='true' />
                      Đăng Ký
                    </>
                  )}
						    </button>

              </form>

              <p className='mt-8 text-center text-sm text-gray-400'>
                Đã có tài khoản?{" "}
                <Link to='/login' className='font-medium text-[#52b0cd] hover:text-[#6dc0d8]'>
                  Đăng nhập ngay <ArrowRight className='inline h-4 w-4' />
                </Link>
					    </p>
          </div>

        </motion.div>

    </div>
  )
}

export default SignUpPage