import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import SIGN_IMG from "./Sign_img";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { login } from "../features/userSlice";
import { useDispatch } from "react-redux";
//import Home from "./Home";
import "../App.css"

const Login = () => {
  //const [loginDetails, setloginDetails] = useState([]);
  const [getUserList, setUserList] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(
      login({
        user: user,
        loggedIn: true,
    })
    );

    const usercheck = getUserList.find(
      (getUser) =>
        getUser.email === user.email && getUser.password === user.password
    );
    if (usercheck) {
      alert("Login Successful");
      const loginObj = { email: user.email, password: user.password };

      localStorage.setItem("loginDetails", JSON.stringify(loginObj));
      //navigate("/employeelist");
    } else {
      alert("Enter Valid Email & Password");
    }
    // axios.post("http://localhost:5000/login", user)
  };

  useEffect(() => {
    axios({ url: "http://localhost:5000/user", method: "get" }).then(
      (response) => {
        setUserList(response.data);
      }
    );
  }, []);

  const dispatch = useDispatch();
  

  return (
    <>
      <div className="container mt-3">
        <section className="d-flex justify-content-between">
          <div className=".left_data mt-3 p-3" style={{ width: "100%" }}>
            <h3>Sign in</h3>
            <Form className="login_form">
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group
                className="mb-3 col-lg-6"
                controlId="formBasicPassword"
              >
                <Form.Control
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </Form.Group>

              <Button
                variant="primary"
                className="col-lg-6 custom-color"
                type="submit"
                onClick={loginHandler}
              >
                Sign In
              </Button>
              <br></br>
            </Form>

            <p>
              Create an Account{" "}
              <span>
                <NavLink to="/home">SignUp</NavLink>
              </span>
            </p>
          </div>

          <SIGN_IMG />
        </section>
      </div>
    </>
  );
};

export default Login;
