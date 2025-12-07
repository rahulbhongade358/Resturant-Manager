import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Menu from "./Menu/menu.jsx";
import Addmenu from "./Admin/addmenu.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import CartPage from "./Pages/CartPage.jsx";
createRoot(document.getElementById("root")).render(
  <Router>
    <CartProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/addmenu" element={<Addmenu />} />
        <Route path="/cartpage" element={<CartPage />} />
      </Routes>
    </CartProvider>
  </Router>
);
