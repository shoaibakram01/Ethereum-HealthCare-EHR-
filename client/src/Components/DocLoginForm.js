import React from 'react';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
function DocLoginForm(props) {
  const [doctorName, setDoctorName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [cnic, setCnic] = useState('');
  const [gender,setGender] = useState('');
  const [qulalification,setQualification]=useState('');
  const SignUpDoctor=async (event)=>{
    event.preventDefault();
    if(doctorName=='' || fatherName=='' || age=='' || address=='' || address=='' || cnic=='' || gender=='' || qulalification==''){
      alert('Please fill form carefully, All fields are required')
    }
    else {
      await props.properties.Contract["OPT"].methods
        .signupDoctor(doctorName,fatherName,age,address,cnic,gender,qulalification)
        .send({ from: props.properties.Account01[0] });
        alert("doctor registered")
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
                  onChange={(event)=>setDoctorName(event.target.value)}
                  required
                  pattern="[a-z]{1,15}"
                  title="name should only contain lowercase letters. e.g. john"
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
                onChange={(event)=>setFatherName(event.target.value)}
                required
                type="text"
                name="fname"
                className="form-control"
                pattern="[a-z]{1,15}"
                title=" father name should only contain lowercase letters. e.g. john"
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
                  onChange={(event)=>setAge(event.target.value)}
                  required
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
                onChange={(event)=>setAddress(event.target.value)}
                required
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
                onChange={(event)=>setCnic(event.target.value)}
                required
                type="text"
                name="cnic"
                className="form-control"
                pattern='[0-9]{5}-[0-9]{7}-[0-9]{1}'
                title=" CNIC should only contain digits"
                
                />
                <small style={{float:'left',marginBottom:'1px'}}>Format: 12345-1234567-1</small><br></br>

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
                <select onChange={(event)=>setGender(event.target.value)} required className="custom-select">
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
                  onChange={(event)=>setQualification(event.target.value)}
                  required
                />
              </div>
            </div>
          </div>
         <div className='mb-2'> <button type='submit'  className='btn btn-primary mb-2'> Sign up </button> </div>
         </form>
        </div>
    </div>
  );
}
export default DocLoginForm;