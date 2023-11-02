import {BrowserRouter, Routes, Route} from "react-router-dom";
import Seats from "./pages/seats";
import Add from "./pages/add";
import Update from "./pages/update";
import Student from "./pages/students";
import Choose from './pages/Choose'; 
import Admin from './pages/admin'; 
import Guest from './pages/guest'; 
import SeatingPlan from './pages/seatingPlan'; 
import Login from './pages/login';
import AddAccount from "./pages/AddAccount";
import AddStudent from "./pages/addStudent";
import UpdateStudent from "./pages/updateStudent";
import Transition from "./pages/transition";
import Users from "./pages/users";
import FilterPage from "./pages/FilterPage";
import LinkFilter from "./pages/LinkFilter";
import UpdateUser from "./pages/updateUser";
import Excel from "./pages/Excel";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/add" element={<Add/>}></Route>
        <Route path="/update/:id" element={<Update/>}></Route>
        <Route path="/student" element={<Student/>}></Route>
        <Route path="/choose" element={<Choose/>}></Route>
        <Route path="/admin" element={<Admin/>}></Route>
        <Route path="/guest" element={<Guest/>}></Route>
        <Route path="/seatingplan" element={<SeatingPlan/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/addaccount" element={<AddAccount/>}></Route>
        <Route path="/addstudent" element={<AddStudent/>}></Route>
        <Route path="/updateStudent/:id" element={<UpdateStudent/>}></Route>
        <Route path="/seats" element={<Seats/>}></Route>
        <Route path="/transition" element={<Transition/>}></Route>
        <Route path="/users" element={<Users/>}></Route>
        <Route path="/updateUser/:id" element={<UpdateUser/>}></Route>
        <Route path="/FilterPage" element={<FilterPage/>}></Route>
        <Route path="/LinkFilter" element={<LinkFilter/>}></Route>
        <Route path="/Excel" element={<Excel/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
