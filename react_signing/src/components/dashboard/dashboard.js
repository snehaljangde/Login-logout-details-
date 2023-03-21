import React, { useState, useEffect } from "react";
import "./dashboard.css";
//import EmployeeList from "./EmployeeList";
import { Button, Table, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";


//display  data DB to Ui
const Dashboard = (props) => {
  console.log("props", props);
 
  const [getUserList, setUserList] = useState([]);
  const [logedInUser, setlogedInUser] = useState([]);
  const [editingData, setEditingData] = useState(null);
const [updateData, setUpdateData] = useState({});

  const navigate = useNavigate();
  const signup = () => {
    // axios.post("http://localhost:5000/login", user).then((res) => {
    //   alert(res.data.message);
    // });
    navigate(`/`);
  };

  useEffect(() => {
    axios({ url: "http://localhost:5000/user", method: "get" }).then(
      (response) => {
        setUserList(response.data);
      }
    );
    setlogedInUser(JSON.parse(localStorage.getItem("loginDetails")));
  }, []);
  console.log("getUserList-dashboard", getUserList, logedInUser);
  function getLogedUserDetails() {
    return getUserList?.filter((user) => {
      return (
        user.email === logedInUser.email &&
        user.password &&
        logedInUser.password
      );
    });
  }

  // const dispatch = useDispatch()
  // function handleSignOut(){
  //   dispatch(logout())
  //   localStorage.removeItem("loginDetails");
  //   navigate('/')
  // }
  function handleEditClick(data) {
    setEditingData(data);
    setUpdateData(data);
  }

  function handleUpdateClick(id) {
    axios.put(`http://localhost:5000/user/${id}`, updateData).then((response) => {
      setUserList(getUserList.map((user) => (user._id === id ? response.data : user)));
    });
   //setEditingData(null);
  }
  
  
  return (
    <div className="homepage">
        <Navbar/>
      <Container>
         
        <div>
          <div className="loged-user">
          
          {getLogedUserDetails()?.map((details) => {
            return <span key={details._id}>LogedIn User: <strong>{details.name}</strong> </span>;
          })}
          {/* <Button variant="light" onClick={handleSignOut}>Sign Out</Button> */}
          </div>
          <h1>Profile Information</h1>
          <Table striped bordered hover size="sm">
            
            <thead>
              <tr>
                <th># Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Date Of Birth</th>
                <th>Country</th>
                <th>State</th>
                <th>City</th>
                <th>Operation</th>
               
              </tr>
            </thead>
            <tbody>
              {getLogedUserDetails()?.map((details) => {
                return (
                  <tr key={details._id}>
                    <td>{details._id}</td>
                    <td>{editingData? <input type="text" value={updateData.name} onChange={(e) => setUpdateData({...updateData, name: e.target.value})} /> :details.name}</td>
                    <td>{editingData? <input type="email" value={updateData.email} onChange={(e) => setUpdateData({...updateData, email: e.target.value})} /> :details.email}</td>
                    <td>{editingData? <input type="tel" value={updateData.mobile} onChange={(e) => setUpdateData({...updateData, mobile: e.target.value})} /> :details.mobile}</td>
                    <td>{editingData? <input type="date" value={updateData.date} onChange={(e) => setUpdateData({...updateData, date: e.target.value})} /> :details.date}</td>
                    <td>{editingData? <input type="text" value={updateData.country} onChange={(e) => setUpdateData({...updateData, country: e.target.value})} /> :details.country}</td>
                    <td>{editingData? <input type="text" value={updateData.state} onChange={(e) => setUpdateData({...updateData, state: e.target.value})} /> :details.state}</td>
                    <td>{editingData? <input type="text" value={updateData.city} onChange={(e) => setUpdateData({...updateData, city: e.target.value})} /> :details.city}</td>
                    <td>
                      {/* <Button variant="link" onClick={() => handleUpdateClick(details._id)}>Update</Button> */}
                      <Button variant="dark" onClick={() => handleUpdateClick(details._id)}>Update</Button>
                      <Button variant="dark" style={{margin:"5px"}} onClick={() => handleEditClick(details)}>Edit</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
