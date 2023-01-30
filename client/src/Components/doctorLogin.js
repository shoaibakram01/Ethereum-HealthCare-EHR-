import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import contractContext from "./context/contractContext";
// import { Link } from "react-router-dom";
import "./css/doctorLogin.css";
import DocLoginForm from "./DocLoginForm";
function DoctorLogin(props) {
  // let history = useHistory();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const Contcontext = useContext(contractContext)
  const [account01, setAccount01] = useState();
  useEffect(() => {
    setAccount01(contractContext.account)
    // const contract = Contcontext;
    // console.log("contract :", contract)
  }, [account01])
  const docLogin = async (event) => {
    event.preventDefault();
    
    console.log("patient Context :", Contcontext)
    var result = null;
    try {
      result = await Contcontext.contract["OPT"].methods
        .getDoctorInfo()
        .call({ from: Contcontext.account[0] });
        localStorage.setItem("healthCare", 'token' )
      navigate(`/DoctorDashoard?id=${Contcontext.account}`);
      // history.push("/DoctorDashoard");
    } catch (err) {
      alert("Account Does Not Exist. Kindly Register");
    }

  }
  return (
    <div className="container">
      {
        Contcontext.contract ? <div>
          <button onClick={docLogin}
            className="btn btn-primary m-2">
            Login With Wallet
          </button>
          <div> <h6>Or</h6> </div>
          <div className="row justify-content-center">
            <div className="col-sm-6" style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div> <h2 style={{ textAlign: 'center', margin: '0' }}> Sign up doctor </h2> </div>
            </div>
          </div>
          <DocLoginForm />
        </div>
          : <i className="fa fa-spinner fa-spin fa-4x" />
      }
    </div>
  );
}
export default DoctorLogin;
