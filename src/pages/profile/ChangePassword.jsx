import { useState, useEffect } from "react";
import { PrimaryButton } from "../../components/atoms/Buttons";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import IconLock from "../../assets/icons/iconLock.png";
import { notification } from "antd";
import { changePassword } from "../../services/api";

const ChangePassword = (props) => {
  const { setSection } = props;
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirm_password: "",
  });

  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(null);

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const toggleCurrentPasswordVisibility = () => {
    setCurrentPasswordVisible(!confirmPasswordVisible);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirm_password) {
      notification.error({
        message: "Password Tidak Cocok",
        description: "Password dan konfirmasi password tidak sama",
        placement: "topRight",
      });
      return;
    }
    if (!passwordMatchError) {
      const { currentPassword, newPassword } = formData;
      const dataToSubmit = { currentPassword, newPassword };
      console.log("Received values of form: ", dataToSubmit);
      changePassword(dataToSubmit)
        .then((res) => {
          if (res) {
            notification.success({
              message: "Sukses",
              description: "Sukses memperbarui kata sandi!",
            });
            setSection("default");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div className="relative">
            <label
              htmlFor="currentPassword"
              className="block text-base font-medium text-black mb-2"
            >
              Kata Sandi Saat Ini
            </label>
            <div className="flex items-center mt-1 relative">
              <img
                src={IconLock}
                alt="lock icon"
                className="absolute left-3 w-4 h-4 text-black"
              />
              <input
                type={currentPasswordVisible ? "text" : "password"}
                id="currentPassword"
                name="currentPassword"
                onChange={handleChange}
                required
                className="w-full pl-10 pr-10 py-2 rounded-lg focus:outline-none focus:outline-primary"
                placeholder="Masukkan kata sandi saat ini"
              />
              <div
                className="absolute right-3 cursor-pointer"
                onClick={toggleCurrentPasswordVisibility}
              >
                {currentPasswordVisible ? (
                  <FaEyeSlash className="w-5 h-5 text-black" />
                ) : (
                  <IoEyeSharp className="w-5 h-5 text-black" />
                )}
              </div>
            </div>
          </div>
          <div className="relative">
            <label
              htmlFor="newPassword"
              className="block text-base font-medium text-black mb-2"
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
                id="newPassword"
                name="newPassword"
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
              className="block text-base font-medium text-black mb-2"
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
        {passwordMatchError && (
          <div className="text-red-500 text-base mb-4">
            {passwordMatchError}
          </div>
        )}
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
