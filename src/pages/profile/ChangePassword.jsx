import { useState, useEffect } from "react";
import { PrimaryButton } from "../../components/atoms/Buttons";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import IconLock from "../../assets/icons/iconLock.png";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Received values of form: ", formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div className="relative">
            <label
              htmlFor="old_password"
              className="block text-base font-medium text-black"
            >
              Kata Sandi Lama
            </label>
            <div className="flex items-center mt-1 relative">
              <img
                src={IconLock}
                alt="lock icon"
                className="absolute left-3 w-4 h-4 text-black"
              />
              <input
                type={newPasswordVisible ? "text" : "password"}
                id="old_password"
                name="old_password"
                onChange={handleChange}
                required
                className="w-full pl-10 pr-10 py-2 rounded-lg focus:outline-none focus:outline-primary"
                placeholder="Masukkan kata sandi lama"
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
              htmlFor="new_password"
              className="block text-base font-medium text-black"
            >
              Kata Sandi Baru
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
                onChange={handleChange}
                required
                className="w-full pl-10 pr-10 py-2 rounded-lg focus:outline-none focus:outline-primary"
                placeholder="Masukkan kata sandi baru"
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
              className="block text-base font-medium text-black"
            >
              Konfirmasi Kata Sandi Baru
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
                onChange={handleChange}
                required
                className="w-full pl-10 pr-10 py-2 rounded-lg focus:outline-none focus:outline-primary"
                placeholder="Konfirmasi kata sandi baru"
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
        </div>
        <PrimaryButton
          text="Save"
          type="submit"
          className="w-full text-white"
        />
      </form>
    </>
  );
};

export default ChangePassword;
