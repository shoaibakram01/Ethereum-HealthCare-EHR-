import React from 'react';
import { useState,useContext } from 'react';
import contractContext from "./context/contractContext";
function PatientLoginForm(props) {
  const [patientName, setPatientName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [cnic, setCnic] = useState('');
  const [gender, setGender] = useState('');
  let Contcontext = useContext(contractContext)
  const handleName = (event) => {
    event.preventDefault();
    setPatientName(event.target.value)
  }
  const handleFatherName = (event) => {
    event.preventDefault();
    setFatherName(event.target.value)
  }
  const handleAge = (event) => {
    event.preventDefault();
    setAge(event.target.value)
  }
  const handleAddress = (event) => {
    event.preventDefault();
    setAddress(event.target.value)
  }
  const handleCnic = (event) => {
    event.preventDefault();
    setCnic(event.target.value)
  }
  const handleGender = (event) => {
    event.preventDefault();
    setGender(event.target.value)
  }
  const handleClick = async (event) => {
    event.preventDefault()
    await Contcontext.contract["OPT"].methods
      .signupPatient(patientName, fatherName, age, address, cnic, gender)
      .send({ from: Contcontext.account[0] });
    // event.preventDefault();
    // console.log('Name',patientName,'Father Name',fatherName,'Age :',age,'Address',address,'CNIC :',cnic, 'Gender :',gender)
    // console.log(patientName,fatherName,age,address,cnic,gender);
  }
  return (<div>
    <form onSubmit={handleClick}>
      <div className="row justify-content-center">
        <div className="col-6">
          <div className="form-group">
            <label htmlFor="name" className="label">
              {" "}
              Enter Patient Name{" "}
            </label>
            <input
              name="name"
              type="text"
              className="form-control"
              onChange={handleName}
              required
            />
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-6">
          <div className="form-group">
            <label htmlFor="fathername" className="label">
              {" "}
              Father Name{" "}
            </label>
            <input onChange={handleFatherName} required name="fathername" type="text" className="form-control" />
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-6">
          <div className="form-group">
            <label htmlFor="name" className="label">
              {" "}
              Age{" "}
            </label>
            <input
              name="age"
              type="text"
              className="form-control"
              onChange={handleAge}
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
            <input onChange={handleAddress} required name="address" type="text" className="form-control" />
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
            <input onChange={handleCnic} required type="number" name="cnic" className="form-control" />
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
            <select required onChange={handleGender} className="custom-select">
              <option defaultValue="Choose...">Choose...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
      </div>
      {/* <div className="row justify-content-center">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="history" className="label">
                  {" "}
                  Patient Medical History{" "}
                </label>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                  />
                  <label className="custom-file-label" htmlFor="inputGroupFile01">
                    Choose file
                  </label>
                </div>
              </div>
            </div>
          </div> */}
      <div className='mb-2'> <button type="submit" onClick={handleClick} className='btn btn-primary mb-2'> Sign up </button> </div>
    </form>
  </div>
  )
}
export default PatientLoginForm;