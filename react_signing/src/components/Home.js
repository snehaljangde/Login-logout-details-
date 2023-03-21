import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import SIGN_IMG from "./Sign_img";
import { CountryStateCity } from "./CountryStateCity";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import "../App.css"
//import { useDispatch, useSelector } from "react-redux";
//import { selectUser } from "../features/userSlice";


const Home = () => {
  const navigate = useNavigate();
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [cscstate, setcscState] = useState({
    country: '',
    state: '',
    city: ''
  });

  const [mobileError, setMobileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [ user, setUser ] = useState({
    name: "", email:"", date: " ", mobile: "", password: ""
  })

  const handleChange = e => {
  const {name, value} = e.target;
  setUser({
           ...user,
            [name]: value 
          });
  };

  const namehandleChange = e => {
    const {name, value} = e.target;
    const isValidName = /^[a-zA-Z]+$/.test(value); // regex to check if name contains only alphabets
    setUser({
             ...user,
              [name]: isValidName ? value : ""
            });
            setNameError(isValidName ? "" : "Name should contain only alphabets");
    };

    const emailhandleChange = e => {
      const {name, value} = e.target;
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // regex to check if the email is valid
      setUser({
               ...user,
                [name]: value 
              });
      setEmailError(isValidEmail ? "" : "Please enter a valid email address");
    };
    
    const mobilehandleChange = e => {
      const {name, value} = e.target;
      let regex = /^[0-9]+$/; // regex to check if the value contains only digits
      setUser({
               ...user,
                [name]: regex ? value : ""
              });
              if (name === "mobile" && !regex.test(value)) {
                setMobileError(regex ? "" : "Ple enter valid mobile no.");
                return;
              }
      };

      

const validatePassword = (value) => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  return regex.test(value);
};

const passwordhandleChange = (e) => {
  const { name, value } = e.target;
  setUser({
    ...user,
    [name]: value,
  });
  setPasswordError(validatePassword(value) ? "" : "Password must contain at least 8 characters including at least one uppercase letter, one lowercase letter, one number, and one special character");
};




  console.log("cscstate",cscstate)

  
   const Signup = (e) => {
    e.preventDefault();
    const { name, email, date, mobile, password} = user
    const {country, state, city}= cscstate
    const payLoad = {...user, ...cscstate}
    //console.log(user);
    if(payLoad && name && email && date && mobile && password && !mobileError && country &&  state && city){
      alert("Account Created")
      axios.post("http://localhost:5000/post", payLoad)
      .then( res => console.log(res));
      navigate(`/`);
    }else {
      alert("Invalid Input")
    }

    
  }
  // 

  return (
    <div className="container mt-3">
      <section className="d-flex justify-content-between">
        <div className=".left_data mt-3 p-3" style={{ width: "100%" }}>
          {console.log("User", {...user, ...cscstate})} 
          <Form method="POST">
            <h2>Create a new account</h2>
            <Form.Group className="mb-3 col-lg-6" controlId="name">
              <Form.Control  type="text" name="name" value={user.name}  onChange={namehandleChange} placeholder="Enter User name" isInvalid={!!nameError}/>
              <Form.Control.Feedback type="invalid">{nameError}</Form.Control.Feedback>
              <Form.Label id="name-error"></Form.Label>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6">
              <Form.Control type="email"  name="email" value={user.email}  onChange={emailhandleChange} placeholder="Enter email" isInvalid={!!emailError}/>
              <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
              <Form.Label id="email-error"></Form.Label>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6">
              <Form.Control  name="date" value={user.date}  max={new Date().toISOString().slice(0, 10)}  type="date"  id="date" onChange={handleChange}  />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6">
              <Form.Control  type="number"  name="mobile" value={user.mobile}  placeholder="Enter Mobile No."  id="mobile" onChange={mobilehandleChange} isInvalid={!!mobileError} />
              <Form.Control.Feedback type="invalid"> Please enter a valid mobile number.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
              <Form.Control  type="password"  name="password" value={user.password}  placeholder="Password"  mobile="password" onChange={passwordhandleChange} isInvalid={!!passwordError} />
              <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
            </Form.Group>

            <CountryStateCity cscHandler={setcscState} cscState={cscstate} />
            <Button  variant="primary"  className="col-lg-6 custom-color"  type="button"  disabled={!user.name || !user.email || !user.date || !user.mobile || !user.password || nameError || emailError || mobileError || passwordError} onClick={(e) => Signup(e)}  >
              Sign Up
            </Button>
          </Form>

          <p>
            Already Have an Account{" "}
            <span>
              <NavLink to="/login">SignIn</NavLink>
            </span>
          </p>
        </div>

        <SIGN_IMG />
      </section>
    </div>
  );
};

export default Home;
