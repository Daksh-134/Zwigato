import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './scss/styles.scss'
import * as bootstrap from 'bootstrap'
import Home from './screens/Home.jsx';
import Login from './screens/Login.jsx';
import Signup from './screens/Signup.jsx';
import MyOrder from './screens/MyOrder.jsx';
import { CartProvider } from './components/ContextReducer.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/sign-up",
    element: <Signup/>,
  },
  {
    path: "/myOrder",
    element: <MyOrder/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
    <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>,
)