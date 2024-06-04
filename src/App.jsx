import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login.jsx";
import Profile from "./pages/profile/Profile.jsx";
function App() {


  return (
    <>
      <BrowserRouter>
                <Routes>
                    <Route path="/auth" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </BrowserRouter>
    </>
  )
}

export default App
