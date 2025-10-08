import "./App.css";
import Register from "./pages/register/Register.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Home from "./pages/home/Home.jsx";
import Admin from "./pages/admin/Admin.jsx";
import ListProduct from "./pages/admin/listProduct/ListProduct.jsx";
import EditProduct from "./pages/admin/editProduct/EditProduct.jsx";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />}>
            <Route path="products" element={<ListProduct />} />
          </Route>
          <Route path="/edit/:id" element={<EditProduct />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
