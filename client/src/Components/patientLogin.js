import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useEffect, useContext } from "react";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientLoginForm from "./PatientLoginForm";
import contractContext from "./context/contractContext";


function PatientLogin(props) {
  const [account01,setAccount01] = useState();
  const [cont01,setCont01] = useState()
    let navigate = useNavigate();
    const Contcontext = useContext(contractContext)
    useEffect(() => {
       setAccount01(contractContext.account)
      //  setCont01(contractContext.contract)
     }
     , [account01]);
     const LoginWithWallet = async(event ) => {
         event.preventDefault();
        //  localStorage.setItem("healthCare", 'token' )
         console.log("patient Context :",Contcontext.account[0] )
    var result = null;
    try {
      result = await Contcontext.contract["OPT"].methods
        .getPatientInfo()
        .call({ from: Contcontext.account[0] });
        navigate(`/PatientDashboard?id=${Contcontext.account}`);
        localStorage.setItem("healthCare",'token')
        console.log("result :", result)
      // history.push("/DoctorDashoard");
    } catch (e) {
      alert(`Account Does Not Exist. Kindly Register,${e}`);
    }

        // console.log('LoginWithWallet');
        // console.log('account',props.Account01);
        // console.log('contract',props.Contract);
        // event.preventDefault(true);
    //console.log(this.state.age);
    // var result = null;
    // try {
    //   await props.Contract["OPT"].methods
    //     .getPatientInfo()
    //     .call({ from: props.Account01[0] });
    //   console.log(result);
    //   this.props.onlogin(result[1], 1);
    // } catch (err) {
    //   alert("Account Does Not Exist. Kindly Register" + err);
    // }
    // navigate(`/PatientDashboard&id=${props.Account01[0]}`);

    }
     
    return (<div className="container">
    <button onClick={LoginWithWallet} className="btn btn-primary m-2"> Login With Wallet </button>
        <div> <h6>Or</h6> </div>
      <div className="row justify-content-center">
        <div className="col-sm-6" style={{display:'flex',justifyContent:'space-around'}}>
       <div> <h2 style={{textAlign:'center',margin:'0'}}> Sign up Patient </h2> </div>
        </div>
      </div>
      <PatientLoginForm  />
  </div>
    )
}
export default PatientLogin;