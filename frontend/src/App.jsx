import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./components/Navbar";
import IndexBody from "./components/IndexBody";
import ParentLogin from "./components/ParentLogin";
import StudentLogin from "./components/StudentLogin";
import PendingStatus from "./components/PendingStatus";
import Register from "./components/Register";
import Lectures from "./components/Lectures";
import AllVideos from "./components/AllVideos";
import Notes from "./components/Notes";
import Dashboard from "./components/Dashboard";
import PaymentDetails from "./components/PaymentDetails";
import Welcome from "./components/Welcome";
import ParentRegister from "./components/ParentRegister";
import StudentMarksDetails from "./components/StudentMarksDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<IndexBody />}></Route>
        <Route
          path="/parentlogin"
          element={<ParentLogin></ParentLogin>}
        ></Route>
        <Route
          path="/studentlogin"
          element={<StudentLogin></StudentLogin>}
        ></Route>
        <Route
          path="/PendingStatus"
          element={<PendingStatus></PendingStatus>}
        ></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/lectures" element={<Lectures></Lectures>}></Route>
        <Route path="/lectureVideos" element={<AllVideos></AllVideos>}></Route>
        <Route path="/notes" element={<Notes></Notes>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route
          path="/paymentdetails"
          element={<PaymentDetails></PaymentDetails>}
        ></Route>
        <Route path="/welcome" element={<Welcome></Welcome>}></Route>
        <Route
          path="/parent_register"
          element={<ParentRegister></ParentRegister>}
        ></Route>
        <Route
          path="/studentMarkDetails"
          element={<StudentMarksDetails></StudentMarksDetails>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
