import React from "react";
// import { propTypes } from "prop-types";
import { useEffect, useState } from "react";
import "./EmployeeList.css";
import Table from "react-bootstrap/Table";
// import Container from 'react-bootstrap/Container';
import { Pagination } from "react-bootstrap";
import Navbar from "./Navbar";
// import Col from "react-bootstrap/Col";
// import Button from "react-bootstrap/Button";
// import axios from "axios";

function EmployeeList(props) {
  const [state, setState] = useState({
    data: [],
    limit: 1,
    activePage: 1,
  });
  const [search, setSearch] = React.useState("");
  useEffect(() => {

    //const navigate = useNavigate();

    async function fetchEmployeeList() {
      try {
        const requesUrl = "https://jsonplaceholder.typicode.com/users";
        const reponse = await fetch(requesUrl);
        const reponseJSON = await reponse.json();
        const filterL = reponseJSON.filter((list) => {
          return list.name.toLowerCase().includes(search.toLowerCase());
        });
        setState((prev) => ({
          ...prev,
          data: filterL
        }));
      } catch (e) {
        return e;
      }
    }
    fetchEmployeeList();
  }, [search]);

  // const [data, setData]= useState([]);
  // const [value, setValue]= useState("");

  // const handleSearch = async (e) => {
  //     e.preventDefault();
  //     return await axios.get("https://jsonplaceholder.typicode.com/users?q=${value}")
  //     .then((responce)=> {
  //     setData(responce.data);
  //     setValue("");
  //     })
  //     .catch((err)=> console.log(err));
  // };

  // function handleFilter(e) {
  //   const currentValue = e.target.value;
  //   const filterL = employeeList.filter((list) => {
  //     return list.name.toLowerCase().includes(currentValue.toLowerCase());
  //   });

  //   setEmployeeList(filterL);
  // }
  const handlePageChange = (pageNumber) => {
    setState((prev) => ({ ...prev, activePage: pageNumber }));
    console.log(pageNumber)
  }
  console.log("state",state)
  return (
    
    <div>
      <Navbar/>
      <div className="form-search">
        <h2>Employee Data</h2>
        <input
          type="text"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          placeholder="Search By Name"
        />
      </div>

      {/* <container className="d-flex input-group w-auto" onSubmit={handleSearch}>
        <Col></Col>
        <input type="text" className="form-control" placeholder="Search Name..." value={value} onChange={(e) => setValue(e.target.value)}> </input>
       
        <Button  type="submit" variant="secondary">Search</Button>{' '}
        </container> */}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>User Name</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {state?.data?.map((list) => {
            return (
              <tr key={list.id}>
                <td>{list.id}</td>
                <td>{list.name}</td>
                <td>{list.email}</td>
                <td>{list.username}</td>
                <td>{list.address.city}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination className="px-4">
        {state.data.map((_, index) => {
          return (
            <Pagination.Item
              onClick={() => handlePageChange(index + 1)}
              key={index + 1}
              active={index + 1 === state.activePage}
            >
              {index + 1}
            </Pagination.Item>
          );
        })}
      </Pagination>
    </div>
  );
}
// EmployeeList.propTypes = {
//   employeeList: propTypes.array,
// };
// EmployeeList.defaultProps = {
//   employeeList: [],
// };

export default EmployeeList;
