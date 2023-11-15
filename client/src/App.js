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
import CreateEvent from "./pages/createevent";
import Events from "./pages/events.jsx";
import Excel from "./pages/Excel";
import ExcelExport from "./pages/ExcelExport";
import StudentExport from "./pages/StudentExport";
import ChooseSeating from "./pages/chooseseat.jsx";
import Seatinglist from "./pages/seatinglist.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/add" element={<Add/>}></Route>
        <Route path="/update/:id" element={<Update/>}></Route>
        <Route path="/student/:id" element={<Student/>}></Route>
        <Route path="/choose" element={<Choose/>}></Route>
        <Route path="/admin" element={<Admin/>}></Route>
        <Route path="/guest/:id" element={<Guest/>}></Route>
        {/* <Route path="/seatingplan" element={<SeatingPlan/>}></Route> */}
        <Route path="/seatingplan/:id" element={<SeatingPlan/>}></Route>
        <Route path="/seatingplan/:id/:eid" element={<SeatingPlan/>}></Route>
        <Route path="/chooseseating/:id" element={<ChooseSeating/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/addaccount" element={<AddAccount/>}></Route>
        <Route path="/addstudent" element={<AddStudent/>}></Route>
        <Route path="/updateStudent/:id" element={<UpdateStudent/>}></Route>
        <Route path="/seats" element={<Seats/>}></Route>
        <Route path="/seatingsearch/:id" element={<Seatinglist/>}></Route>
        <Route path="/transition" element={<Transition/>}></Route>
        <Route path="/users" element={<Users/>}></Route>
        <Route path="/updateUser/:id" element={<UpdateUser/>}></Route>
        <Route path="/FilterPage" element={<FilterPage/>}></Route>
        <Route path="/events" element={<Choose/>}></Route>
        <Route path="/createevent" element={<CreateEvent/>}></Route>
        <Route path="/event" element={<Events/>}></Route>
        <Route path="/LinkFilter" element={<LinkFilter/>}></Route>
        <Route path="/Excel/:id" element={<Excel/>}></Route>
        <Route path="/ExcelExport" element={<ExcelExport/>}></Route>
        <Route path="/StudentExport" element={<StudentExport/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
