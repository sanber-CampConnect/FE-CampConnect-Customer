import "./App.scss";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Outlet,
} from "react-router-dom";
import React, { Suspense, useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { getProfile } from "./services/api.js";
import { notification } from "antd";
import PageLoading from "./components/organisms/PageLoading.jsx";
import Page404 from "./components/organisms/Page404.jsx";
import Checkout from "./pages/cart/Checkout.jsx";

const Login = React.lazy(() => import("./pages/auth/Login.jsx"));
const Profile = React.lazy(() => import("./pages/profile/Profile.jsx"));
const Register = React.lazy(() => import("./pages/auth/Register.jsx"));
const ForgotPassword = React.lazy(() =>
  import("./pages/auth/ForgotPassword.jsx")
);
const UpdatePassword = React.lazy(() =>
  import("./pages/auth/UpdatePassword.jsx")
);
const SuccessPass = React.lazy(() => import("./pages/auth/SuccessPass.jsx"));
const HomeLayout = React.lazy(() => import("./layouts/HomeLayout.jsx"));
const Home = React.lazy(() => import("./pages/home/Home.jsx"));
const Catalogue = React.lazy(() => import("./pages/catalogue/Catalogue.jsx"));
const DetailCatalogue = React.lazy(() =>
  import("./pages/catalogue/DetailCatalogue.jsx")
);
const Cart = React.lazy(() => import("./pages/cart/Cart.jsx"));
const Payment = React.lazy(() => import("./pages/payment/Payment.jsx"));
const PaymentCode = React.lazy(() => import("./pages/payment/PaymentCode.jsx"));
const Order = React.lazy(() => import("./pages/order/Order.jsx"));

// handle token not found error
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/login");
    }
  }, [navigate]);

  const token = localStorage.getItem("token");
  return token ? <RequireAuth>{children}</RequireAuth> : null;
};

// token validation
const RequireAuth = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getDataProfile = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        notification.error({
          message: "Tidak ada token!",
          description: "Tidak ditemukan token. Silahkan masuk lagi.",
        });
        navigate("/auth/login");
        return;
      }

      try {
        await getProfile();
        setLoggedIn(true);
      } catch (err) {
        if (
          err.response &&
          (err.response.status === 401 || err.response.status === 403)
        ) {
          notification.error({
            message: "Sesi Berakhir!",
            description: "Sesi Anda telah kedaluwarsa. Silakan masuk lagi.",
          });
          navigate("/auth/login");
        }
      } finally {
        setLoading(false);
      }
    };

    getDataProfile();
  }, [navigate]);

  if (loading) {
    return <PageLoading />;
  }

  return isLoggedIn ? children : null;
};

const AppContent = () => {
  return (
    <Routes>
      <Route path="*" element={<Page404 />} />
      <Route
        path="/auth/login"
        element={
          <Suspense fallback={<PageLoading />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/auth/register"
        element={
          <Suspense fallback={<PageLoading />}>
            <Register />
          </Suspense>
        }
      />
      <Route
        path="/auth/forgot-pass"
        element={
          <Suspense fallback={<PageLoading />}>
            <ForgotPassword />
          </Suspense>
        }
      />
      <Route
        path="/auth/resetPassword"
        element={
          <Suspense fallback={<PageLoading />}>
            <UpdatePassword />
          </Suspense>
        }
      />
      <Route
        path="/auth/success"
        element={
          <Suspense fallback={<PageLoading />}>
            <SuccessPass />
          </Suspense>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Suspense fallback={<PageLoading />}>
              <HomeLayout>
                <Profile />
              </HomeLayout>
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <Suspense fallback={<PageLoading />}>
              <HomeLayout>
                <Payment />
              </HomeLayout>
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment-code/:id"
        element={
          <ProtectedRoute>
            <Suspense fallback={<PageLoading />}>
              <HomeLayout>
                <PaymentCode />
              </HomeLayout>
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Suspense fallback={<PageLoading />}>
              <HomeLayout>
                <Order />
              </HomeLayout>
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <Suspense fallback={<PageLoading />}>
            <HomeLayout>
              <Home />
            </HomeLayout>
          </Suspense>
        }
      />
      <Route
        path="/catalogue"
        element={
          <Suspense fallback={<PageLoading />}>
            <HomeLayout>
              <Catalogue />
            </HomeLayout>
          </Suspense>
        }
      />
      <Route
        path="/catalogue/:productId"
        element={
          <Suspense fallback={<PageLoading />}>
            <HomeLayout>
              <DetailCatalogue />
            </HomeLayout>
          </Suspense>
        }
      />
      <Route
        path="/cart"
        element={
          <Suspense fallback={<PageLoading />}>
            <HomeLayout>
              <Cart />
            </HomeLayout>
          </Suspense>
        }
      />
      <Route
        path="/checkout"
        element={
          <Suspense fallback={<PageLoading />}>
            <HomeLayout>
              <Checkout />
            </HomeLayout>
          </Suspense>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoading />}>
          <AppContent />
        </Suspense>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
