import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Login from "./components/Login";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";
import EmployeeList from "./components/EmployeeList";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
function App() {  
 
const user = useSelector(selectUser);

  return (
    // <BrowserRouter>
    // <Routes><Route path="/">{user&&user ? <Home/>: <UseDataContextLoginValue/>}</Route></Routes>
    // </BrowserRouter>
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={
        user && user ? <EmployeeList/> : <Login/>
    } />
    <Route path="/dashboard" element={<Dashboard/>} /> 
    <Route path="/home" element={<Home/>} />
    {/* <Route path="/employeelist" element={<EmployeeList/>} /> */}
       
      </Routes>
      </BrowserRouter>  
    </div>
  );
}

export default App;
