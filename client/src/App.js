//Main Execution will start from this file.
//Fistly all components will get mounted by componentsDidMount method and then render method will be called

import React, { Component } from "react";
import optHealthCare from "./contracts/optimized_healthCare.json"
import getWeb3 from "./getWeb3";
import DocLogin from "./Components/DocLogin";
import Doctor from "./Components/Doctor";
import Patient from "./Components/Patient";
import NavbarComp from "./Components/NavbarComp";
import SignUp from "./Components/signUp";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import "./App.css";
import "./Components/css/antd.css"
import 'antd/dist/antd.css';
import {
  BrowserRouter,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <SignUp/> */}
      {/* <BrowserRouter> */}
      <NavbarComp />
      {/* </BrowserRouter> */}
      
    </div>
  );
}
export default App;
