import "./App.css";
import Home from "./components/Home/Home";
import ProductDetails from './components/Product/ProductDetails'
import Products from './components/Product/Products';
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LoginSignUp from './components/User/LoginSignUp';
import Profile from './components/User/Profile'
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword'
import ForgotPassword from './components/User/ForgotPassword'
import ResetPassword from './components/User/ResetPassword'
import Shipping from './components/Cart/Shipping'
import ProtectedRoute from "./components/Route/ProtectedRoute";
import Cart from './components/Cart/Cart'
import { useEffect, useState } from "react";
import store from './store.js'
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./components/Cart/Payment";
import OrderSuccess from './components/Cart/OrderSuccess'
import MyOrders from './components/Order/MyOrders'
import OrderDetails from './components/Order/OrderDetails'
import Dashboard from './components/Admin/Dashboard'

function App() {
  const { user } = useSelector(state => state.user);

  const [stripeApiKey, setStripeApiKey] = useState('');

  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/stripeapikey')

    setStripeApiKey(data.stripeApiKey)
  }

  useEffect(() => {
    store.dispatch(loadUser())
    getStripeApiKey()
  }, [])
  return (
    <div className="App">
      <Header user={user} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/account" element={
          <ProtectedRoute redirectTo='/login'>
            <Profile />
          </ProtectedRoute>
        } />

        <Route exact path="/me/update" element={
          <ProtectedRoute redirectTo='/login'>
            <UpdateProfile />
          </ProtectedRoute>
        } />

        <Route exact path='/password/update' element={
          <ProtectedRoute redirectTo='/login'>
            <UpdatePassword />
          </ProtectedRoute>
        }
        />

        <Route exact path='/password/forgot' element={<ForgotPassword />} />

        <Route exact path="/password/reset/:token" element={<ResetPassword />} />

        <Route exact path="/cart" element={<Cart />} />

        <Route exact path='/shipping' element={
          <ProtectedRoute redirectTo='/login'>
            <Shipping />
          </ProtectedRoute>
        }
        />

        <Route exact path='/process/payment' element={
          <ProtectedRoute redirectTo='/login'>
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Payment />
            </Elements>
          </ProtectedRoute>
        }
        />

        <Route exact path='/success' element={
          <ProtectedRoute redirectTo='/login'>
            <OrderSuccess />
          </ProtectedRoute>
        }
        />

        <Route exact path='/orders' element={
          <ProtectedRoute redirectTo='/login'>
            <MyOrders />
          </ProtectedRoute>
        }
        />

        <Route exact path='/order/:id' element={
          <ProtectedRoute redirectTo='/login'>
            <OrderDetails />
          </ProtectedRoute>
        }
        />

        <Route exact path='/admin/dashboard' element={
          <ProtectedRoute redirectTo='/login'>
            <Dashboard />
          </ProtectedRoute>
        }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
