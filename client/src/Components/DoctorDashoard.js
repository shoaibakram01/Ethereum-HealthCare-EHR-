import React from "react";
import './css/doctorDashboard.css'
import { useEffect, useState, useContext } from "react";
import { Row, Col, Card, Tag } from "antd";
import Display_file from "./common/display_file";
import { useLocation } from 'react-router-dom'
import contractContext from "./context/contractContext";
import axios from "axios";
import fileDownload from 'js-file-download'

function DoctorDashoard() {
  const address = useLocation().search;
  const [name, setName] = useState(null);
  const [patientList, setpatientList] = useState([]);
  const [patientfiles, setPatientFiles] = useState([]);
  const [loadPatient, setLoadPatient] = useState("");
  const Contdata = useContext(contractContext)
  const docAddress = new URLSearchParams(address).get("id");
  useEffect(() => {
    loadDoctor();
  }, [Contdata,docAddress]);
  const handleClick = (url, filename) => {
    axios.get(url, {
      responseType: 'blob',
    })
      .then((res) => {
        fileDownload(res.data, filename)
      })
  }

  const loadDoctor = async () => {
    if(Contdata.contract && Contdata.account){
      let healthRecord = await Contdata.contract["OPT"].methods
        .getDoctorInfo()
        .call({ from: docAddress });
      setName(healthRecord[0]);
      setpatientList([...patientList, healthRecord[8]]);
      console.log("OPT :", Contdata)
    }
    else {
      
    }

  }

  const handlePatientList = async (value) => {
    setLoadPatient(value);
    try {
      const data = await Contdata.contract["OPT"].methods
        .getPatientInfoForDoctor(value)
        .call({ from: docAddress });
      console.log("Patient Files",data[3]);
      // patientfiles(...[data[3]])
      setPatientFiles(data[3])
      // console.log("PatientFiles : ", patientfiles )

    }
    catch (e) {
      console.log("error in catching")
    }

  }


  // const loadFiles = async () => {
  //   data = await props.Contract["OPT"].methods
  //     .getPatientInfoForDoctor(props.patientAddress[0])
  //     .call({ from: props.account[0] });
  //     console.log("useState :",data[3][1].file_hash)
  //   setFiles(data[3]);
  //   setnameArray(data[0]);
  //   setAge(data[1]);
  //   console.log('files', files);
  // }


  return (
    <div className="container">
      {/* <h1>Doctor Dashoard</h1> */}
      <div className="row">
        <div className="col-12"> {name} </div>
        <div className="col-sm-6">
          <div className="row">
            <div className="col-12">
              {patientList.length > 0 ? <div>
                {
                  patientList.map((patientList, index) => (
                    <div className="col" key={index} style={{ padding: "5px" }}>
                      <div style={{ height: "100vh" }}>
                        <Tag style={{ padding: '8px' }} onClick={
                          // () => { setLoadPatient(patientList[index]) }} >
                          () => { handlePatientList(patientList[index]) }} >
                          {patientList[0]}
                        </Tag>
                      </div>
                    </div>
                  ))}
              </div> : <i className="fa fa-spinner fa-spin fa-2x" />
              }
            </div>
          </div>
        </div>

        <div className="col-sm-6">
         

          <div className="row">
          {patientfiles.map((file,i) => (
                <div className="col" key={i} style={{ padding: "5px" }}>
                  <div style={{ height: "100vh" }}>
                    <div className="files" style={{display:'flex'}}>
                    <div>{file.file_name}</div>
                    <img src={`https://ipfs.io/ipfs/${file[i][file.file_hash]}`} />
                     <button style={{ margin: 15 }} className='btn btn-primary download_btn' onClick={() => handleClick( `https://ipfs.io/ipfs/${file.file_hash}`, `${file.file_name}`)}> Download File </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default DoctorDashoard;
