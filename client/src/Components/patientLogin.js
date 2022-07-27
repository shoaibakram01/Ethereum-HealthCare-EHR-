import React from "react";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import PatientLoginForm from "./PatientLoginForm";


function PatientLogin(props) {
    let history = useHistory();
    useEffect(() => {
        console.log("props",props);
        props.setRoute();
     }
     , []);
     const LoginWithWallet = async(event ) => {
         event.preventDefault();
        console.log('LoginWithWallet');
        console.log('account',props.Account01);
        console.log('contract',props.Contract);
        // event.preventDefault(true);
    //console.log(this.state.age);
    // var result = null;
    try {
      await props.Contract["OPT"].methods
        .getPatientInfo()
        .call({ from: props.Account01[0] });
    //   console.log(result);
    //   this.props.onlogin(result[1], 1);
    } catch (err) {
      alert("Account Does Not Exist. Kindly Register" + err);
    }
        history.push("/PatientDashboard");

    }
     
    return (<div className="container">
    <button onClick={LoginWithWallet} className="btn btn-primary m-2"> Login With Wallet </button>
        <div> <h6>Or</h6> </div>
      <div className="row justify-content-center">
        <div className="col-sm-6" style={{display:'flex',justifyContent:'space-around'}}>
       <div> <h2 style={{textAlign:'center',margin:'0'}}> Sign up Patient </h2> </div>
        </div>
      </div>
      <PatientLoginForm properties={props} />
  </div>
    )
}
export default PatientLogin;