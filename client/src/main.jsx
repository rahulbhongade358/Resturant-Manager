import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Menu from "./Menu/menu.jsx";
import Allorder from "./Admin/allorder.jsx";
import Addmenu from "./Admin/addmenu.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import CartPage from "./Pages/CartPage.jsx";
import MyOrder from "./Pages/MyOrder.jsx";
import SignUp from "./Component/Signup.jsx";
import Login from "./Component/Login.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
createRoot(document.getElementById("root")).render(
  <Router>
    <CartProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/menu" element={<Menu />} />
        <Route
          path="/addmenu"
          element={
            <ProtectedRoute allowed={["Admin"]}>
              <Addmenu />
            </ProtectedRoute>
          }
        />
        <Route path="/cartpage" element={<CartPage />} />
        <Route
          path="/allorder"
          element={
            <ProtectedRoute allowed={["Admin", "Waiter", "Chef"]}>
              <Allorder />
            </ProtectedRoute>
          }
        />
        <Route path="/myorder" element={<MyOrder />} />
        <Route
          path="/signup"
          element={
            <ProtectedRoute allowed={["Admin"]}>
              <SignUp />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </CartProvider>
  </Router>
);
