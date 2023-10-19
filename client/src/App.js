import {BrowserRouter, Routes, Route} from "react-router-dom";
import Seats from "./pages/seats";
import Add from "./pages/add";
import Update from "./pages/update";
import Student from "./pages/students";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Seats/>}></Route>
        <Route path="/add" element={<Add/>}></Route>
        <Route path="/update" element={<Update/>}></Route>
        <Route path="/student" element={<Student/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
