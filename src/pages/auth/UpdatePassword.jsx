import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/api';
import { notification } from 'antd';
import { IoEyeSharp } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa';
import Logo from '../../assets/images/logo.png';
import IconLock from '../../assets/icons/iconLock.png';

const UpdatePassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate(); // Gunakan useNavigate untuk navigasi

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      notification.error({
        message: 'Error',
        description: 'Passwords do not match.',
      });
      return;
    }
  
    const data = {
      newPassword: newPassword,
      confirmPassword: confirmPassword
    };
  
    try {
      const response = await resetPassword(token, data);
      console.log(response.data); // Log respons dari backend
      notification.success({
        message: 'Success',
        description: 'Your password has been updated successfully.',
      });
      navigate('/auth/success'); // Navigasi ke halaman success
    } catch (error) {
      console.error(error.response?.data || error.message); // Log kesalahan
      notification.error({
        message: 'Error',
        description: error.response?.data.message || 'Failed to update password.',
      });
    }
  };

  return (
    <div className="flex flex-col xl:flex-row items-center justify-center min-h-screen bg-white">
      <div className="hidden xl:flex flex-1 items-center justify-center h-full relative"></div>
      <div className="w-full max-w-xl mx-auto mr-10 p-8 xl:w-1/2">
        <div className="text-left -ml-60 -mt-16 xl:text-left">
          <img src={Logo} alt="logo" className="w-20 pt-3 mx-auto " />
        </div>
        <div className="font-poppins text-left mt-6 ">
          <h1 className="text-xl font-semibold xl:hidden block">
            Reset a new password
          </h1>
          <p className="font-medium text-base font-poppins xl:hidden">
            A new password that is unique and different from the previous
            password
          </p>
        </div>
        <form className="space-y-6 pt-12 xl:-ml-10" onSubmit={handleUpdatePassword}>
          <div className="relative">
            <label
              htmlFor="new_password"
              className="block text-sm font-medium text-black"
            >
              New Password
            </label>
            <div className="flex items-center mt-1 relative">
              <img
                src={IconLock}
                alt="lock icon"
                className="absolute left-3 w-4 h-4 text-black"
              />
              <input
                type={newPasswordVisible ? "text" : "password"}
                id="new_password"
                name="new_password"
                required
                className="w-full pl-10 pr-10 py-2 border-b-2 border-black rounded-none focus:outline-none focus:border-[#FF432A]"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <div
                className="absolute right-3 cursor-pointer"
                onClick={toggleNewPasswordVisibility}
              >
                {newPasswordVisible ? (
                  <FaEyeSlash className="w-5 h-5 text-black" />
                ) : (
                  <IoEyeSharp className="w-5 h-5 text-black" />
                )}
              </div>
            </div>
          </div>
          <div className="relative">
            <label
              htmlFor="confirm_password"
              className="block text-sm font-medium text-black"
            >
              Confirm Password
            </label>
            <div className="flex items-center mt-1 relative">
              <img
                src={IconLock}
                alt="lock icon"
                className="absolute left-3 w-4 h-4 text-black"
              />
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirm_password"
                name="confirm_password"
                required
                className="w-full pl-10 pr-10 py-2 border-b-2 border-black rounded-none focus:outline-none focus:border-[#FF432A]"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div
                className="absolute right-3 cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {confirmPasswordVisible ? (
                  <FaEyeSlash className="w-5 h-5 text-black" />
                ) : (
                  <IoEyeSharp className="w-5 h-5 text-black" />
                )}
              </div>
            </div>
          </div>
          <div className="pt-10">
            <button
              type="submit"
              className="w-full px-4 py-3 text-white bg-primary rounded-3xl hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium font-poppins"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
