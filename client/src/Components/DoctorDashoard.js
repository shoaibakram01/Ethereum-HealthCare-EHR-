import React from "react";
import './css/doctorDashboard.css'
import { useEffect, useState, useContext } from "react";
import { Row, Col, Card, Tag } from "antd";
import Display_file from "./common/display_file";
import { useLocation } from 'react-router-dom'
import contractContext from "./context/contractContext";
import axios from "axios";
import fileDownload from 'js-file-download';
import { Modal } from 'react-bootstrap';

function DoctorDashoard() {
  const [url,setUrl] = useState(null)
  const [showModal, setShow] = useState(false);
  const address = useLocation().search;
  const [name, setName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [address01, setAddress01] = useState(null);
  const [age, setAge] = useState(null);
  const [phone, setPhone] = useState(null);
  const [gender, setGender] = useState(null)
  const [patientList, setpatientList] = useState([]);
  const [patientfiles, setPatientFiles] = useState([]);
  const [loadPatient, setLoadPatient] = useState("");
  const Contdata = useContext(contractContext)
  const docAddress = new URLSearchParams(address).get("id");
  useEffect(() => {
    loadDoctor();
  }, [Contdata, docAddress]);
  const handleClick = (url, filename) => {
    axios.get(url, {
      responseType: 'blob',
    })
      .then((res) => {
        fileDownload(res.data, filename)
      })
  }

  const loadDoctor = async () => {
    if (Contdata.contract && Contdata.account) {
      let healthRecord = await Contdata.contract["OPT"].methods
        .getDoctorInfo()
        .call({ from: docAddress });
      setName(healthRecord[0]);
      setLastName(healthRecord[1])
      setAddress01(healthRecord[3])
      setAge(healthRecord[2]);
      setPhone(healthRecord[4])
      setGender(healthRecord[5])
      setpatientList([...patientList, healthRecord[8]]);
      console.log("OPT :", healthRecord[5])
    }
    else {

    }

  }
  const toggleFunc = (value) => {
    // console.log("Toggle")
    setUrl(value)
    setShow(!showModal)
  }
  const handlePatientList = async (value) => {
    setLoadPatient(value);
    try {
      const data = await Contdata.contract["OPT"].methods
        .getPatientInfoForDoctor(value)
        .call({ from: docAddress });
      console.log("Patient Files", data[3]);
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
        <div className="col-12">
          {
            name && lastName ? (
              <div>
                <h1> Doctor Profile </h1>
                <div>
                  First Name : {name}
                </div>
                <div>
                  Last Name : {lastName}
                </div>
                <div>
                  Age : {age}
                </div>
                <div>
                  Age : {gender}
                </div>
                <div>
                  Address : {address01}
                </div>
                <div>
                  Phone : {phone}
                </div>
              </div>

            ) : <i className="fa fa-spinner fa-spin fa-2x" />
          }
          {/* {name}  */}
        </div>
        <div className="col-sm-6">
              
          <div className="row">
            <div className="col-12">
        <h1> Patients List </h1>
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
            {patientfiles.map((file, i) => (
              <div className="col-6" key={i} style={{ padding: "5px" }}>
                <div>
                  <div className="files" style={{ display: 'flex' }}>
                    <div>{file.file_name}</div>
                    {/* <img src={`https://ipfs.io/ipfs/${file[i][file.file_hash]}`} /> */}
                    <div className="buttons">
                      <button className='btn btn-primary' onClick={()=>toggleFunc(`https://ipfs.io/ipfs/${file.file_hash}`)} > Preview </button>
                      <button style={{ margin: 15 }} className='btn btn-primary download_btn' onClick={() => handleClick(`https://ipfs.io/ipfs/${file.file_hash}`, `${file.file_name}`)}> Download File </button>
                      <Modal show={showModal} >
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                          <div className="modal-content">
                            <Modal.Header>
                              <Modal.Title> Preview </Modal.Title>
                            </Modal.Header>
                            <Modal.Body className='modal-body'>
                              <iframe
                                title={''}
                                src={url}
                                style={{ width: '400px', height: '500px' }}
                              >
                              </iframe>
                            </Modal.Body>
                            <Modal.Footer >
                              <button type="button" className="btn btn-secondary" onClick={toggleFunc} >Close</button>
                            </Modal.Footer>
                          </div>
                        </div>
                      </Modal>
                    </div>
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
