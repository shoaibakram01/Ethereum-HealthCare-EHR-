import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./css/signup.css";
import { BrowserRouter as Router, Switch, Route, Link, useNavigate } from "react-router-dom";
import DoctorLogin from "./doctorLogin";
import PatientLogin from "./patientLogin";
// import { useHistory } from "react-router-dom";
function SignUp() {
  let navigate = useNavigate();
  const hanldeHistory=(event)=>{
    event.preventDefault();
    navigate("/doctor");
  }
  return (
    <div className="container">
        <div className="App">
          <div className="row">
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Doctor</h5>
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                      <button onClick={hanldeHistory} className="btn btn-primary">Register</button>
                      <button className="btn btn-primary">Login</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Patient</h5>
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                      <button className="btn btn-primary">
                        Register
                      </button>
                      <button className="nav-link btn btn-primary">
                        Login
                      </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}
export default SignUp;
