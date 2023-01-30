import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import optHealthCare from "../contracts/optimized_healthCare.json"
import getWeb3 from "../getWeb3";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Routes, useNavigate
} from "react-router-dom";
import Home from './Home';
import DoctorLogin from "./doctorLogin";
import PatientLogin from "./patientLogin";
import DoctorDashoard from "./DoctorDashoard";
import PatientDashboard from "./PatientDashboard";
import ContractState from "./context/contractState";
import ProtectedRoute from "./ProtectedRoute";
function NavbarComp() {
  const navigate = useNavigate();
  //   let isLogged = this.props.isLogged?false:true;
  // console.log('is logged',isLogged);
  // const [web3, setweb3] = useState();
  // const [account, setaccount] = useState();
  // const [contract, setContract] = useState();
  // const [route, setRoute] = useState('');
  // const [isLogged, setIsLogged] = useState(false);
  // const showLoginButton = () => {
  //   setIsLogged(true);
  // }

  // useEffect(() => {
  //   getContract();
  // }, []);


  // const getContract = async()=>{
  //   try {
  //     var web3 = await getWeb3();
  //     var tmpcont = [];
  //     setaccount(await web3.eth.getAccounts());
  //     const networkId = await web3.eth.net.getId();
  //     var deployedNetwork = optHealthCare.networks[networkId];
  //     tmpcont['OPT'] = new web3.eth.Contract(
  //       optHealthCare.abi,
  //       deployedNetwork && deployedNetwork.address,
  //     );
  //     setweb3(web3);
  //     setContract(tmpcont);
  //   } catch (error) {
  //     alert(
  //       `Failed to load web3, accounts, or contract. Check console for details.`,
  //     );
  //     console.error(error);
  //   }
  // } 

  const handleLogin =(event)=>{
    event.preventDefault();
    // localStorage.setItem( '',)
    localStorage.setItem("healthCare", ' ')
    navigate('/')
    // console.log("Hanldle Login")
  }
  return (<div>
    <>
      <ContractState>

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav" >
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/doctor">Doctor</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/patient">Patient</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-primary" onClick={handleLogin}> Login </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route exact path="/" element={<Home />}>
          </Route>
          <Route path="/doctor" element={<DoctorLogin />}>
          </Route>
          <Route path="/patient" element={<PatientLogin/>}>
          </Route>
          <Route path="/DoctorDashoard" element={ <ProtectedRoute Component={DoctorDashoard} />}>
          </Route>
          <Route path="/PatientDashboard" element={<ProtectedRoute Component={PatientDashboard} />}>
          </Route>
        </Routes>
      </ContractState>
    </>
  </div>

  );

}


export default NavbarComp;