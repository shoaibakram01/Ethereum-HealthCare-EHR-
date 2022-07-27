import React from "react";
import { useEffect, useState } from "react";
import { Row, Col, Card, Tag } from "antd";
import Display_file from "./common/display_file";

function DoctorDashoard(props) {
  const [name, setName] = useState(null);
  const [patientList, setpatientList] = useState([]);
  const[patientfiles,setPatientFiles] = useState([]);
  const [loadPatient,setLoadPatient]=useState("")
  useEffect(() => {
    console.log("props245", props);
    props.handleLogin();
    loadDoctor();
  }, []);
  const loadDoctor = async () => {
    let healthRecord = await props.Contract["OPT"].methods
      .getDoctorInfo()
      .call({ from: props.Account01[0] });
    setName(healthRecord[0]);
    setpatientList([...patientList,healthRecord[8]]);
    console.log("patientslist:", healthRecord[8]);
    // console.log("patients:", patientList);
    // console.log('typeCheck :', ]));
  }
//   const loadFiles=async(i)=>{

//     const data = await props.Contract["OPT"].methods.getPatientInfoForDoctor(i).call({from:props.Account01[0]});
//     console.log('files doctor Component',data);
//     setPatientFiles([...patientfiles,data[3]]);
//     // if(data[3])
//     // this.setState({patient_name:data[0],patient_age:data[1],files:data[3]});

//     // console.log('files',this.state.files);
// }
  return (
    <div className="container">
      {/* <h1>Doctor Dashoard</h1> */}
      <div className="row">
        <div className="col-12"> {name} </div>
        <div className="col-sm-6">
          <div className="row">
            <div className="col-12">
              {
              patientList.map((patientList) => (
                // console.log("type of patientlist at 0 index:",patientList[0]),
                // console.log('sdgsdfgs',patientList),
                <div className="col" key={patientList} style={{ padding: "5px" }}>
                  <div style={{ height: "100vh" }}>
                    <Tag style={{padding:'8px'}} onClick={()=>{setLoadPatient(patientList)}} >{patientList}</Tag>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="col-sm-6">
          
            {loadPatient?<Display_file account={props.Account01} Contract={props.Contract} patientAddress={loadPatient}/>:'No patients'}
            {/* <div className="row"> */}
            {/* {patientfiles.map((i) => (
                <div className="col" key={i} style={{ padding: "5px" }}>
                  <div style={{ height: "100vh" }}>
                    <Tag onClick={loadFiles(i)}>{i}</Tag>
                  </div>
                </div>
              ))} */}
            {/* </div> */}
        </div>
      </div>
    </div>
  );
}
export default DoctorDashoard;
