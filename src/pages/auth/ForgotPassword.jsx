import Logo from "../../assets/logo.png";
import IconEmail from "../../assets/icons/iconEmail.png";


const ForgotPassword = () => {


    return (
        <>
        <div className="flex flex-col xl:flex-row items-center justify-center min-h-screen bg-white">
            <div className="w-full max-w-xl mx-auto mr-10 p-8 ">
                <div className="text-left -ml-60 -mt-16 ">
                    <img
                        src={Logo}
                        alt="logo"
                        className="w-20 pt-3- mx-auto xl:mx-0 xl:hidden"
                    />
                </div>
                <div className="font-poppins text-left mt-20 ">
                    <h1 className="text-xl font-semibold xl:hidden block">
                        Forgot Password
                    </h1>
                    <p className="font-medium text-base font-poppins xl:hidden mt-1">
                        Enter your email to reset password
                    </p>
                </div>
                <form className="space-y-6 pt-16 ">
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
                                placeholder="Enter your email "
                            />
                        </div>
                    </div>
                    <div className="pt-10">
                        <button
                            type="submit"
                            className="w-full px-4 py-3 text-white bg-primary rounded-3xl hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium font-poppins"
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
};

export default  ForgotPassword;
