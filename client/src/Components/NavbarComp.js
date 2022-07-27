import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import optHealthCare from "../contracts/optimized_healthCare.json"
import getWeb3 from "../getWeb3";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Home';
import DoctorLogin from "./doctorLogin";
import PatientLogin from "./patientLogin";
import DoctorDashoard from "./DoctorDashoard";
import PatientDashboard from "./PatientDashboard";
function NavbarComp () {
    //   let isLogged = this.props.isLogged?false:true;
    // console.log('is logged',isLogged);
    const [web3,setweb3]= useState();
    const [account,setaccount]= useState();
    const [contract,setContract]= useState();
    const [route,setRoute]= useState('');
    const [isLogged,setIsLogged]= useState(false);
    const showLoginButton = () => {
      setIsLogged(true);
    }

      useEffect( async () => {
        try {
    
          var web3 = await getWeb3();
          var tmpcont=[];
          setaccount( await web3.eth.getAccounts());
          // Get the contract instance.
          const networkId = await web3.eth.net.getId();
          var deployedNetwork = optHealthCare.networks[networkId];
    
           tmpcont['OPT'] = new web3.eth.Contract(
            optHealthCare.abi,
            deployedNetwork && deployedNetwork.address,
          );
    
         //set State variables to derived values.
          // setState({ web3, accounts, contract:tmpcont});
          setweb3(web3);
          // setaccount(accounts);
          setContract(tmpcont);
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }
      },[]);
        return(<div>
          <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
              <a className="navbar-brand" href="#">{route}</a>
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
                            {isLogged?<li>
                              <button className="btn btn-primary">Logout</button>
                            </li>:''}
                      </ul>
                 </div>
            </div>
      </nav>
       <Switch>
            <Route exact path="/">
                <Home setRoute={()=>{setRoute('Home')}} />
            </Route>
            <Route  path="/doctor">
                <DoctorLogin Account01={account} Contract={contract}  setRoute={()=>{setRoute('Doctor')}} />
            </Route>
            <Route  path="/patient">
                <PatientLogin Account01={account} Contract={contract} setRoute={()=>{setRoute('Patient')}} />
            </Route>
            <Route path="/DoctorDashoard">
            <DoctorDashoard Account01={account} Contract={contract} handleLogin={showLoginButton}/>
            </Route>
            <Route path="/PatientDashboard">
            <PatientDashboard Account01={account} Contract={contract} handleLogin={showLoginButton}/>
            </Route>
      </Switch>
  </Router>
        </div>
          
            // <div bg="dark">
                
            //   <Navbar bg="primary" variant="dark">
            //     <Navbar.Brand href="#home">Welcome To EHR</Navbar.Brand>
            //     <Nav className="mr-auto">
            //       {/* <Nav.Link href="#home">Home</Nav.Link>
            //       <Nav.Link href="#features">Features</Nav.Link>
            //       <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            //     </Nav>
            //     <Form inline>
            //       <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            //       {isLogged?
            //       <Button variant="outline-light" onClick={()=>this.props.onlogout()}>Logout</Button>:<div></div>}
            //     </Form>
            //   </Navbar>
            // </div>
            );
    
}


export default NavbarComp;