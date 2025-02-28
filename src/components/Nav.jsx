import React, { useState } from 'react'
import Home from '../screens/Home'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import { Link,useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Modal from '../modal'
import Cart from '../screens/Cart'
import { useCart } from './ContextReducer'
export default function nav() {
  let data= useCart()
  const navigate= useNavigate()
  const [cartView,setCartView]=useState(false)

  const handleLogout= ()=>{
    localStorage.removeItem("authToken");
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand fs-2 fst-italic" to="#">MENU-MATE</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link active fs-4" aria-current="page" to="/">Home</Link>
            </li>
            {(localStorage.getItem("authToken"))?
              <li className="nav-item">
              <Link className="nav-link active fs-4" aria-current="page" to="/myOrder">My Orders</Link>
              </li>
            :""}
          </ul>
          {!(localStorage.getItem("authToken"))?
          <div className='d-flex'>
            <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
            <Link className="btn bg-white text-success mx-1" to="/sign-up">Sign up</Link>
          </div>
          :
          <>
          <div className='d-flex'>
            <div className="btn bg-white text-success mx-2" onClick={()=>{setCartView(true)}}>
              My Cart {" "}
              <Badge pill bg="danger">{data.length}</Badge>
            </div>
            {cartView?
            <Modal onClose={()=>{setCartView(false)}}>
              <Cart/>
            </Modal>
            :null}
          </div>
          <div className='d-flex'>
            <Link className="btn bg-white text-danger mx-2" onClick={handleLogout}>Logout</Link>
          </div>
          </>
          }
        </div>
      </div>
    </nav>
  )
}
