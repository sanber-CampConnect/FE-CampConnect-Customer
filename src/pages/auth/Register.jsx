import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import Logo from "../../assets/logo.png";
import IconEmail from "../../assets/icons/iconEmail.png";
import IconLock from "../../assets/icons/iconLock.png";
import ImgPlaceholder from "../../assets/placeholder.png";

const Register = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
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
                <div className="text-center xl:text-left">
                    <img
                        src={Logo}
                        alt="logo"
                        className="w-20 pt-3 mx-auto xl:mx-0 xl:hidden"
                    />
                </div>
                <div className="font-poppins text-left mt-6 -ml-10">
                    <h1 className="text-xl font-semibold">Register</h1>
                    <p className="font-medium text-base mt-3">
                        If you already have an account
                        <br />
                        You can{" "}
                        <a href="#" className="text-red-600">
                            Login here!
                        </a>
                    </p>
                </div>
                <form className="space-y-6 pt-12 -ml-10">
                    <div className="relative">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-black"
                        >
                            Email
                        </label>
                        <div className="flex items-center mt-1">
                            <img
                                src={IconEmail}
                                alt="email icon"
                                className="absolute left-3 w-4 h-4 text-black"
                            />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full pl-10 pr-3 py-2 border-b-2 border-black rounded-none focus:outline-none focus:border-[#FF432A]"
                                placeholder="Enter your email address"
                            />
                        </div>
                    </div>
                    <div className="relative">
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-black"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            className="w-full pl-3 pr-3 py-2 border-b-2 border-black rounded-none focus:outline-none focus:border-[#FF432A]"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="relative">
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-black"
                        >
                            Phone
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            className="w-full pl-3 pr-3 py-2 border-b-2 border-black rounded-none focus:outline-none focus:border-[#FF432A]"
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div className="relative">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-black"
                        >
                            Password
                        </label>
                        <div className="flex items-center mt-1 relative">
                            <img
                                src={IconLock}
                                alt="lock icon"
                                className="absolute left-3 w-4 h-4 text-black"
                            />
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                name="password"
                                required
                                className="w-full pl-10 pr-10 py-2 border-b-2 border-black rounded-none focus:outline-none focus:border-[#FF432A]"
                                placeholder="Enter your password"
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
                                type={
                                    confirmPasswordVisible ? "text" : "password"
                                }
                                id="confirm_password"
                                name="confirm_password"
                                required
                                className="w-full pl-10 pr-10 py-2 border-b-2 border-black rounded-none focus:outline-none focus:border-[#FF432A]"
                                placeholder="Confirm your password"
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
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="w-full px-4 py-3 text-white bg-primary rounded-3xl hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium font-poppins"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
