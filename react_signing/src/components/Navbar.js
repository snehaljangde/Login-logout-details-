import React from 'react'
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { logout } from '../features/userSlice';


const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    function handleSignOut(){
      dispatch(logout())
      localStorage.removeItem("loginDetails");
      navigate('/')
    }


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
   
  <div classNameName="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <Link className="nav-link" to="/" href="#">Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/dashboard" href="#">Profile</Link>
      </li>
      <li style={{paddingLeft:"1250px"}}>
      <Button variant="light"  onClick={handleSignOut}>Sign Out</Button>
      </li>
    </ul>
  </div>
</nav>
  )
}

export default Navbar;