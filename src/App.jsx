import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Register from './pages/auth/Register.jsx';
import ForgotPassword from './pages/auth/ForgotPassword.jsx';
import VerifyCode from './pages/auth/VerifyCode.jsx';
import UpdatePassword from './pages/auth/UpdatePassword.jsx';
import SuccessPass from './pages/auth/SuccessPass.jsx';
function App() {


  return (
    <>
      <BrowserRouter>
                <Routes>
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />
                    <Route path="/auth/forgot-pass" element={<ForgotPassword />} />
                    <Route path="/auth/verify-code" element={<VerifyCode />} />
                    <Route path="/auth/update-pass" element={<UpdatePassword />} />
                    <Route path="/auth/success" element={<SuccessPass />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </BrowserRouter>
    </>
  )
}

export default App
