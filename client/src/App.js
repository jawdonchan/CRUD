import {BrowserRouter, Routes, Route} from "react-router-dom";
import Seats from "./pages/seats";
import Add from "./pages/add";
import Update from "./pages/update";
import Student from "./pages/students";
import Choose from './pages/Choose'; 
import Admin from './pages/admin'; 
import Guest from './pages/guest'; 
import SeatingPlan from './pages/seatingPlan'; 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Seats/>}></Route>
        <Route path="/add" element={<Add/>}></Route>
        <Route path="/update" element={<Update/>}></Route>
        <Route path="/student" element={<Student/>}></Route>
        <Route path="/choose" element={<Choose/>}></Route>
        <Route path="/admin" element={<Admin/>}></Route>
        <Route path="/guest" element={<Guest/>}></Route>
        <Route path="/seatingplan" element={<SeatingPlan/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
