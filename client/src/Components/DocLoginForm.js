import React from 'react';
import { useState, useContext } from 'react';
import contractContext from "./context/contractContext";
function DocLoginForm(props) {
  let [doctorName, setDoctorName] = useState('');
  let [fatherName, setFatherName] = useState('');
  let [age, setAge] = useState('');
  let [address, setAddress] = useState('');
  let [cnic, setCnic] = useState('');
  let [gender, setGender] = useState('');
  let [qulalification, setQualification] = useState('');
  let [error, setError] = useState([])
  let Contcontext = useContext(contractContext)
  const SignUpDoctor = async (event) => {
    event.preventDefault();
    if (doctorName == '' || fatherName == '' || age == '' || address == '' || cnic == '' || gender == '' || qulalification == '') {
      // alert('Please fill form carefully, All fields are required')
      let err = [];
      err.push("All fields are required");
      setError(err);
    }
    else {
      try {
        await Contcontext.contract["OPT"].methods
          .signupDoctor(doctorName, fatherName, age, address, cnic, gender, qulalification)
          .send({ from: Contcontext.account[0] });
        alert("doctor registered")
      }
      catch (e) {
        alert(`error : ${e}`)
      }
    }
  }


  return (
    <div>
      <div className="container">
        <form onSubmit={SignUpDoctor} >
          <div className="row justify-content-center">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="dname" className="label">
                  {" "}
                  Enter Name{" "}
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  onChange={(e) => setDoctorName(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="fname" className="label">
                  {" "}
                  Father Name{" "}
                </label>
                <input
                  onChange={(e) => setFatherName(e.target.value)}
                  required
                  type="text"
                  name="fname"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="age" className="label">
                  {" "}
                  Age{" "}
                </label>
                <input
                  type="number"
                  name="age"
                  className="form-control"
                  min="0"
                  onChange={(e) => setAge(e.target.value)}
                // required
                />
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="address" className="label">
                  {" "}
                  Address{" "}
                </label>
                <input
                  onChange={(e) => setAddress(e.target.value)}
                  // required
                  type="text"
                  name="address"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="cnic" className="label">
                  {" "}
                  CNIC #{" "}
                </label>
                <input
                  onChange={(e) => setCnic(e.target.value)}
                  required
                  type="text"
                  name="cnic"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="gender" className="label">
                  {" "}
                  Gender{" "}
                </label>
                <select onChange={(e) => setGender(e.target.value)} required className="custom-select">
                  <option defaultValue="Choose...">Choose...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="qualification" className="label">
                  {" "}
                  Qualification{" "}
                </label>
                <input
                  type="text"
                  name="qulalification"
                  className="form-control"
                  onChange={(e) => setQualification(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div className='mb-2'> <button type='submit' className='btn btn-primary mb-2'> Sign up </button> </div>
        </form>
      </div>
    </div>
  );
}
export default DocLoginForm;