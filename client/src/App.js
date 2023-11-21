import {BrowserRouter, Routes, Route} from "react-router-dom";
import Seats from "./pages/seating/seats.jsx";
import Add from "./pages/unknown/add.jsx";
import Update from "./pages/seating/update";
import Student from "./pages/student/students";
import Choose from './pages/events/Choose'; 
import Guest from './pages/student/guest'; 
import SeatingPlan from './pages/seating/seatingPlan'; 
import Login from './pages/user/login';
import AddAccount from "./pages/user/AddAccount";
import UpdateStudent from "./pages/student/updateStudent";
import Transition from "./pages/slides/transition";
import Users from "./pages/user/users";
import FilterPage from "./pages/slides/FilterPage";
import LinkFilter from "./pages/slides/LinkFilter";
import UpdateUser from "./pages/user/updateUser";
import CreateEvent from "./pages/events/createevent";
import Events from "./pages/events/events.jsx";
import Excel from "./pages/upload-export/Excel";
import ExcelExport from "./pages/upload-export/ExcelExport";
import StudentExport from "./pages/upload-export/StudentExport";
import ChooseSeating from "./pages/seating/chooseseat.jsx";
import Seatinglist from "./pages/seating/seatinglist.jsx";
import UpdateEvent from "./pages/events/updateEvent.jsx"

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
        <Route path="/guest/:id" element={<Guest/>}></Route>
        <Route path="/seatingplan" element={<SeatingPlan/>}></Route>
        <Route path="/seatingplan/:id" element={<SeatingPlan/>}></Route>
        <Route path="/seatingplan/:id/:eid" element={<SeatingPlan/>}></Route>
        <Route path="/chooseseating/:id" element={<ChooseSeating/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/addaccount" element={<AddAccount/>}></Route>
        {/* <Route path="/addstudent" element={<AddStudent/>}></Route> */}
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
        <Route path="/updateevent/:id" element={<UpdateEvent/>}></Route>
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
