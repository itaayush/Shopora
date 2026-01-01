import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PageNotFoundPage from "./pages/PageNotFoundPage";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import Dashboard from "./pages/user/Dashboard";
import UserProfile from "./pages/user/UserProfile";
import Orders from "./pages/user/Orders";
import LayoutWrapper from "./components/layout/LayoutWrapper";
import { useAuth } from "./context/auth";

function App() {
  const [auth] = useAuth();
  return (
    <>
      <Routes>
        <Route element={<LayoutWrapper />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/register" element={!auth?.token ? <Register /> : <Navigate to="/" />} />
          <Route path="/login" element={!auth?.token ? <Login /> : <Navigate to="/" />} />
          <Route path="/dashboard/user" element={auth?.token ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/dashboard/user/profile" element={auth?.token ? <UserProfile /> : <Navigate to="/login" />} />
          <Route path="/dashboard/user/orders" element={auth?.token ? <Orders /> : <Navigate to="/login" />} />

          <Route path="*" element={<PageNotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
