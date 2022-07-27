import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./css/doctorLogin.css";
import DocLoginForm from "./DocLoginForm";
function DoctorLogin(props) {
    let history = useHistory();
    const [show, setShow] = useState(false);
    useEffect(() => {
       console.log("props",props);
       props.setRoute();
    }
    , []);
    const docLogin= async(event)=>{
        event.preventDefault();
        console.log('LoginWithWallet');
        console.log('account',props.Account01);
        console.log('contract',props.Contract);
       
            event.preventDefault();
            var result = null;
    try {
      result = await props.Contract["OPT"].methods
        .getDoctorInfo()
        .call({ from: props.Account01[0] });
      // console.log('CheckDoc',result);
      history.push("/DoctorDashoard");
      // this.props.onlogin(result[1], 0);
      // console.log("Time taken to load Doctor Data");
      // console.log("240ms");
    } catch (err) {
      alert("Account Does Not Exist. Kindly Register");
    }
            // var result = null;
            // try {
            //   result = await props.Contract["OPT"].methods
            //     .getDoctorInfo()
            //     .call({ from: props.Account01[0] });
            //   // console.log('CheckDoc',result);
            //   // this.props.onlogin(result[1], 0);
            //   // console.log("Time taken to load Doctor Data");
            //   // console.log("240ms");
            // } catch (err) {
            //   alert("Account Does Not Exist. Kindly Register");
            //   // history.push("/");
            // }
    }
  return (
    <div className="container">
        <button onClick={docLogin} className="btn btn-primary m-2"> Login With Wallet </button>
        <div> <h6>Or</h6> </div>
      <div className="row justify-content-center">
        <div className="col-sm-6" style={{display:'flex',justifyContent:'space-around'}}>
       <div> <h2 style={{textAlign:'center',margin:'0'}}> Sign up doctor </h2> </div>
        </div>
      </div>
      <DocLoginForm properties={props}/>
    </div>
  );
}
export default DoctorLogin;
