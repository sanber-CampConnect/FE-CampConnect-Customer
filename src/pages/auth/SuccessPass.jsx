import { Link } from "react-router-dom";

const SuccessPass = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <div className="text-center">
                <h1 className="text-2xl font-semibold font-poppins">Succesful</h1>
                <p className="text-base mt-2 font-poppins">
                Congratulations! Your Password has <br />been changed. Click continue to login
                </p>
                <Link to="">
                <div className="pt-10">
                        <button
                            type="submit"
                            className="w-full px-4 py-3 text-white bg-primary rounded-3xl hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium font-poppins"
                        >
                            Continue
                        </button>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default SuccessPass;
