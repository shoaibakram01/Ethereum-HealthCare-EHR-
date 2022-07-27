import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./css/DocLogin.css";

class DocLogin extends Component {
  state = { textvalue: "", formNum: false, age: 0 };
  cont = this.props.state.contract;
  Acc = this.props.state.accounts;

  async registerDoc(event) {
    event.preventDefault(true);
    const val = this.state.textvalue;

    await this.cont["OPT"].methods
      .signupDoctor(val,'shoaib',12,'Pakistan','12242','Male','bscs')
      .send({ from: this.Acc[0] });
      console.log('doctor registered')
  }
  async checkDoc(event) {
    event.preventDefault(true);
    var result = null;
    try {
      result = await this.cont["OPT"].methods
        .getDoctorInfo()
        .call({ from: this.Acc[0] });
      // console.log('CheckDoc',result);
      // this.props.onlogin(result[1], 0);
      // console.log("Time taken to load Doctor Data");
      // console.log("240ms");
    } catch (err) {
      alert("Account Does Not Exist. Kindly Register");
    }
  }
  async registerPat(event) {
    event.preventDefault(true);
    const name = this.state.textvalue;
    const age = this.state.age;
    await this.cont["OPT"].methods
      .signupPatient(name,'Shoaib', age, 'Pakistan', '332655321','Male')
      .send({ from: this.Acc[0] });
    // const tmp = await this.cont['Doc'].methods.getDoctorInfo().call({from :this.Acc[0]});
    // console.log(val+err);
  }
  async checkPat(event) {
    event.preventDefault(true);
    //console.log(this.state.age);
    var result = null;
    try {
      result = await this.cont["OPT"].methods
        .getPatientInfo()
        .call({ from: this.Acc[0] });
      console.log(result);
      this.props.onlogin(result[1], 1);
    } catch (err) {
      alert("Account Does Not Exist. Kindly Register" + err);
    }
  }
  render() {
    this.registerDoc = this.registerDoc.bind(this);
    this.checkDoc = this.checkDoc.bind(this);
    this.registerPat = this.registerPat.bind(this);
    this.checkPat = this.checkPat.bind(this);
    //this.handleChange = this.handleChange.bind(this);
    // this.alterformD = this.alterformD.bind(this);
    // this.alterformP = this.alterformP.bind(this);

    const docForm = (
      <form>
        <div className="container">
          <div>Doctor</div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="dname" className="label">
                  {" "}
                  Enter Name{" "}
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  onChange={(event) => {
                    this.setState({ textvalue: event.target.value });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="fname" className="label">
                  {" "}
                  Father Name{" "}
                </label>
                <input type="text" name="fname" className="form-control" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
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
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="address" className="label">
                  {" "}
                  Address{" "}
                </label>
                <input type="text" name="address" className="form-control" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="cnic" className="label">
                  {" "}
                  CNIC #{" "}
                </label>
                <input type="number" name="cnic" className="form-control" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="dname" className="label">
                  {" "}
                  Gender{" "}
                </label>
                <select className="custom-select">
                  <option defaultValue="Choose...">Choose...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="dname" className="label">
                  {" "}
                  Qualification{" "}
                </label>
                <input
                  type="text"
                  name="qulalification"
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>
        {/* <legend>  <div className="formName">Doctor</div></legend> 
        <div className="label">  Enter Name</div>
      <input type="text" name="name" onChange={(event)=>{
        this.setState({textvalue:event.target.value});
      }} ></input>
    <br></br>*/}
        <Button variant="dark" className="button" onClick={this.registerDoc}>
          Register
        </Button>
        <Button variant="dark" className="button" onClick={this.checkDoc}>
          Login By Address
        </Button>
      </form>
    );

    const patForm = (
      <div className="container">
        <form>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="name" className="label">
                  {" "}
                  Enter Patient Name{" "}
                </label>
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    this.setState({ textvalue: event.target.value });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="fathername" className="label">
                  {" "}
                  Father Name{" "}
                </label>
                <input name="fathername" type="text" className="form-control" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="name" className="label">
                  {" "}
                  Age{" "}
                </label>
                <input
                  name="age"
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    this.setState({ age: event.target.value });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="address" className="label">
                  {" "}
                  Address{" "}
                </label>
                <input name="address" type="text" className="form-control" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="cnic" className="label">
                  {" "}
                  CNIC #{" "}
                </label>
                <input type="number" name="cnic" className="form-control" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="gender" className="label">
                  {" "}
                  Gender{" "}
                </label>
                <select className="custom-select">
                  <option defaultValue="Choose...">Choose...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
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
          </div>
          {/* <div className="formName">Patient</div>

        <div className="label">Enter Name</div>
        <input
          type="text"
          name="name"
          onChange={(event) => {
            this.setState({ textvalue: event.target.value });
          }}
        />
        <br />
        <div className="label">Age</div>

        <input
          type="text"
          name="age"
          onChange={(event) => {
            this.setState({ age: event.target.value });
          }}
        ></input>
        <br></br>
        */}
          <Button
            className="button"
            variant="dark"
            onClick={this.registerPat.bind(this)}
          >
            Register
          </Button>
          <Button
            className="button"
            variant="dark"
            onClick={this.checkPat.bind(this)}
          >
            Login By Address
          </Button>
        </form>
      </div>
    );
    const fNum = this.state.formNum;
    let loadForm;
    if (fNum) loadForm = patForm;
    else loadForm = docForm;
    return (
      <div className="form">
        <div className="alterBut">
          <Button
            className="button"
            variant="primary"
            value="0"
            onClick={(event) => this.setState({ formNum: false })}
          >
            Doctor
          </Button>

          <Button
            className="button"
            variant="success"
            value="1"
            onClick={(event) => this.setState({ formNum: true })}
          >
            Patient
          </Button>
        </div>

        <fieldset>{loadForm}</fieldset>
      </div>
    );
  }
}

export default DocLogin;
