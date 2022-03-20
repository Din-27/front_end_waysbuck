import { BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";
import { UserContext, UserContextProvider } from "./context/userContext";
import Home from "../src/pages/Home";
import LoginModal from "./pages/LoginModals";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageLogin from "./pages/PageLogin";
import PageAdmin from "./pages/PageAdmin";
import Profile from "./pages/ProfileUser";
import Transaction from "./pages/Transaction";
import AddProduct from "./pages/AddProduct";
import AddToping from "./pages/AddToping";
import Admin from "./pages/Admin";
import Cart from './pages/Cart'
import Product from './pages/BackupProduct'
import UpdateProduct from './pages/UpdateProduct'
import UpdateToping from './pages/UpdateToping'
import 'bootstrap/dist/css/bootstrap.min.css';
import ComplainAdmin from './pages/ComplainAdmin'
import Complain from './pages/Complain'







function App() {




  console.clear()

  return (
  <Router>
    <UserContextProvider>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/auth" element={<LoginModal />} />
        <Route exact path="/auth" element={<Login />} />
        <Route exact path="/regiter" element={<Register />} />
        <Route exact path="/page-user" element={<PageLogin />} />
        <Route exact path="/page-admin" element={<PageAdmin />} />
        <Route exact path="/page-admin/:id" element={<PageAdmin />} />
        <Route exact path="/profile-user/:id" element={<Profile />} />
        <Route exact path="/cart" element={<Cart/>} />
        <Route exact path="/cart/:id" element={<Cart/>} />
        <Route exact path="/transaction-user" element={<Transaction />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/complain-admin" element={<ComplainAdmin />} />
        <Route exact path="/complain" element={<Complain/>} />
        <Route exact path="/admin/:id" element={<Admin />} />
        <Route exact path="/add-product" element={<AddProduct />} />
        <Route exact path="/add-toping" element={<AddToping />} />
        <Route exact path="/product/:id" element={<Product/>} />
        <Route exact path="/update-product/:id" element={<UpdateProduct/>} />
        <Route exact path="/update-toping/:id" element={<UpdateToping/>} />
      </Routes>
    </UserContextProvider>
</Router>
  );
}

export default App;