import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const VerifyCode = () => {
  const [code, setCode] = useState(new Array(4).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setCode([...code.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  return (
    <div className="flex flex-col xl:flex-row items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-xl mx-auto mr-10 p-8">
        <div className="text-left -ml-60 -mt-16">
          <img
            src={Logo}
            alt="logo"
            className="w-20 pt-3 mx-auto xl:mx-0 xl:hidden"
          />
        </div>
        <div className="font-poppins text-left mt-6">
          <h1 className="text-xl font-semibold xl:hidden block">
            Check your email
          </h1>
          <p className="font-medium text-base font-poppins xl:hidden mt-1">
            We sent a reset link to contact@gmail.com. Enter the 4-digit code
            mentioned in the email.
          </p>
        </div>
        <form className="space-y-6 pt-16">
          <div className="relative">
            <label
              htmlFor="code"
              className="block text-sm font-medium text-black"
            ></label>
            <div className="flex items-center justify-between mt-1">
              {code.map((data, index) => {
                return (
                  <input
                    type="text"
                    name="code"
                    maxLength="1"
                    key={index}
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                    className="w-16 h-16 text-center text-xl border-2 border-[#E1E1E1] rounded-xl focus:outline-none focus:border-[#FF432A]"
                  />
                );
              })}
            </div>
          </div>
          <div className="pt-10">
            <button
              type="submit"
              className="w-full px-4 py-3 text-white bg-primary rounded-3xl hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium font-poppins"
            >
              Verify Code
            </button>
            <div className="font-poppins text-left mt-6 ml-5 xl:hidden">
              <p className="font-normal text-xs mt-3">
                Haven’t got the email yet?{" "}
                <Link
                  to=""
                  className="text-indigo-600 hover:underline hover:text-indigo-600"
                >
                  Resend email
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyCode;
