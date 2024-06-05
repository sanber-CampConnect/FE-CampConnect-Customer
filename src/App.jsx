import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Register from './pages/auth/Register.jsx';
function App() {


  return (
    <>
      <BrowserRouter>
                <Routes>
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </BrowserRouter>
    </>
  )
}

export default App
