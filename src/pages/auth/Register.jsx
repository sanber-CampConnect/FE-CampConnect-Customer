import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import Logo from "../../assets/images/logo.png";
import { iconEmail, iconLock } from "../../assets/icons";
import ImgPlaceholder from "../../assets/images/placeholder.png";
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { authRegister } from "../../services/api";
import { notification } from "antd";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    fullname: "",
    password: "",
    confirm_password: "",
  });
  const [passwordMatchError, setPasswordMatchError] = useState(null);
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
    if (id === "password" || id === "confirm_password") {
      if (id === "password") {
        if (value !== formData.confirm_password) {
          setPasswordMatchError("Password dan Konfirmasi Password harus sama");
        } else {
          setPasswordMatchError(null);
        }
      } else {
        if (value !== formData.password) {
          setPasswordMatchError("Password dan Konfirmasi Password harus sama");
        } else {
          setPasswordMatchError(null);
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      notification.error({
        message: "Password Tidak Cocok",
        description: "Password dan konfirmasi password tidak sama",
        placement: "topRight",
      });
      return;
    }

    const dataToSubmit = {
      email: formData.email,
      fullname: formData.fullname,
      name: formData.name,
      password: formData.password,
    };

    console.log("Received values of form: ", dataToSubmit);
    authRegister(dataToSubmit)
      .then((res) => {
        if (res.status === 200) {
          notification.success({
            message: "Registrasi Berhasil",
            description: "Akun Anda berhasil dibuat, silakan login",
          });
          navigate("/auth/login");
        }
      })
      .catch((err) => {
        notification.error({
          message: "Registrasi Gagal!",
          description:
            err.response?.data?.message || "Terjadi kesalahan saat registrasi",
          placement: "topRight",
        });
      });
  };

  return (
    <div className="flex flex-col xl:flex-row items-center justify-center min-h-screen bg-white">
      <div className="hidden xl:flex flex-1 items-center justify-center h-full relative">
        <div className="absolute -top-28 left-20">
          <img src={Logo} alt="Logo" className="w-20" />
        </div>
        <div className="w-2/3 h-2/3 flex items-center justify-center">
          <img
            src={ImgPlaceholder}
            alt="Placeholder"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="w-full max-w-xl mx-auto p-8 xl:w-1/2">
        <div className="text-center -ml-60  xl:text-left">
          <img
            src={Logo}
            alt="logo"
            className="w-20 pt-3 mx-auto xl:mx-0 xl:hidden"
          />
        </div>
        <div className="font-poppins text-left mt-6 xl:-ml-10">
          <h1 className="text-xl font-semibold">Register</h1>
          <p className="font-medium text-base font-poppins xl:hidden">
            Silahkan isi data diri di bawah ini
          </p>
          <p className="font-medium text-base mt-3 hidden xl:block">
            Jika Anda sudah memiliki akun
            <br />
            Anda dapat{" "}
            <Link to="/auth/login" className="text-failed hover:underline">
              Masuk Disini!
            </Link>
          </p>
        </div>
        <form className="space-y-6 pt-12 xl:-ml-10" onSubmit={handleSubmit}>
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
              Email
            </label>
            <div className="flex items-center mt-1">
              <img
                src={iconEmail}
                alt="email icon"
                className="absolute left-3 w-4 h-4 text-black"
              />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 border-b-2 border-black rounded-none focus:outline-none focus:border-[#FF432A]"
                placeholder="Masukkan alamat email"
              />
            </div>
          </div>
          <div className="relative">
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-black"
            >
              Nama Lengkap
            </label>
            <div className="flex items-center mt-1">
              <FaRegUser className="absolute left-3 w-4 h-4 text-black" />
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 border-b-2 border-black rounded-none focus:outline-none focus:border-[#FF432A]"
                placeholder="Masukkan nama lengkap"
              />
            </div>
          </div>
          <div className="relative">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-black"
            >
              Nama Akun
            </label>
            <div className="flex items-center mt-1">
              <FaRegUser className="absolute left-3 w-4 h-4 text-black" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 border-b-2 border-black rounded-none focus:outline-none focus:border-[#FF432A]"
                placeholder="Masukkan nama akun"
              />
            </div>
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black"
            >
              Kata Sandi
            </label>
            <div className="flex items-center mt-1 relative">
              <img
                src={iconLock}
                alt="lock icon"
                className="absolute left-3 w-4 h-4 text-black"
              />
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-10 py-2 border-b-2 border-black rounded-none focus:outline-none focus:border-[#FF432A]"
                placeholder="Masukkan kata sandi"
              />
              <div
                className="absolute right-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <FaEyeSlash className="w-5 h-5 text-black" />
                ) : (
                  <IoEyeSharp className="w-5 h-5 text-black" />
                )}
              </div>
            </div>
            {passwordMatchError && (
              <p className="text-red-600 text-sm mt-1">{passwordMatchError}</p>
            )}
          </div>
          <div className="relative">
            <label
              htmlFor="confirm_password"
              className="block text-sm font-medium text-black"
            >
              Konfirmasi Kata Sandi
            </label>
            <div className="flex items-center mt-1 relative">
              <img
                src={iconLock}
                alt="lock icon"
                className="absolute left-3 w-4 h-4 text-black"
              />
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirm_password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-10 py-2 border-b-2 border-black rounded-none focus:outline-none focus:border-[#FF432A]"
                placeholder="Masukkan konfirmasi kata sandi"
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
            {passwordMatchError && (
              <p className="text-red-600 text-sm mt-1">{passwordMatchError}</p>
            )}
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full px-4 py-3 text-white bg-primary rounded-3xl focus:outline-none focus:bg-primary-dark"
            >
              Register
            </button>
          </div>
          <p className="mt-4 text-center text-sm text-black xl:hidden">
            Jika Anda sudah memiliki akun,{" "}
            <Link to="/auth/login" className="text-[#2D5BFF] hover:underline">
              Masuk Disini!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
