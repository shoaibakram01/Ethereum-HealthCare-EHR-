import React, { useEffect, useState, useContext } from "react";
import { Input } from "antd";
import ipfs from "./ipfs-util";
import FileCard from "./FileCard";
import contractContext from "./context/contractContext";
import { useLocation } from 'react-router-dom';
function PatientDashboard(props) {
  // const client = create({url:'https://ipfs.infura.io:5001/api/v0'});
  const [name, setName] = useState("");
  const [grantAccess01, setGrantAccess01] = useState(false);
  const [upload, setUpload] = useState(false);
  const [fatherName, setFatherName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [cnic, setCnic] = useState("");
  const [gender, setGender] = useState("");
  const [buffer, setBuffer] = useState("");
  const [filename, setFilename] = useState("");
  const [filetype, setFiletype] = useState("");
  const [files, setFiles] = useState([]);
  const [showPop, setShowPop] = useState([]);
  const [shows, setShows] = useState(true);
  const [account, setAccount] = useState('');
  const Contdata01 = useContext(contractContext)
  const address01 = useLocation().search;
  const patAddress = new URLSearchParams(address01).get("id");
  useEffect(() => {
    // console.log("patient dashboard", Contdata01);
    setTimeout(() => {
      loadPatient();
      loadFiles();
    }, 3000)
  },
    [Contdata01]
  );
  const loadPatient = async () => {
    //console.log(contract);
    try {
      let res = await Contdata01.contract["OPT"].methods
        .getPatientInfo()
        .call({ from: patAddress });
      setName(res[0]);
      setFatherName(res[1]);
      setAge(res[2]);
      setAddress(res[3]);
      setCnic(res[4]);
      setGender(res[5]);
    }
    catch (e) {
      // alert(`there is an error :${e}`)
    }


  };
  const getFile = async (event) => {
    event.preventDefault();
    console.log("getfile");
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setBuffer(Buffer(reader.result), file);
      setFilename(file.name);
      setFiletype(file.type);

      console.log("buffer786", file);
    };
  };
  const uploadFile = async (event) => {
    event.preventDefault();

    ipfs.files.add(buffer, (err, res) => {
      if (err) {
        console.error("error-------------", err);
        return;
      }
      else {
        updateFileHash(filename, filetype, res[0].hash);
      }
    });

  };

  const updateFileHash = async (name, type, ipfshash) => {
    //sending transaction and storing result to state variables
    try {
      setUpload(true)
      let res = await Contdata01.contract["OPT"].methods
        .addUserFiles(name, type, ipfshash)
        .send({ from: patAddress });
    }
    catch (e) {
      alert(`file upload successful: ${e}`);
      alert(`file upload unsuccessful: ${e}`);
    }
    setUpload(false)
  };
  const loadFiles = async () => {
    try {
      const files = await Contdata01.contract["OPT"].methods
        .getUserFiles(patAddress)
        .call({ from: patAddress });
      console.log("files--->", files);
      if (files[0]) setFiles(files);
    }
    catch (e) {
      // alert(`error while loading files :${e}`)
    }
  };
  const showFile = (hash, flag) => {
    // let { files, showPopup } = this.state;
    if (files.indexOf(hash) > -1) {
      let showPopupTemp = showPop.slice(0);
      console.log("showPopupTemp", showPopupTemp);
      // showPopupTemp[files.indexOf(hash)] = flag;
      // setShowPop(showPopupTemp);
      // this.setState({showPopup:showPopupTemp});
    }
  }

  const grantAccess = async (event) => {
    event.preventDefault()
    if (account) {
      setGrantAccess01(true)
      let res = await Contdata01.contract["OPT"].methods.grantAccessToDoctor(account)
        .send({ "from": patAddress });

      if (res) {
        // message.success('access successful');
        console.log('access granted');
        setAccount('');
      }
    }
    setGrantAccess01(false);

  }

  return (
    <div className="container">
      <h4>Patient Dashoard</h4>
      <div className="row">
        <div className="col" style={{ textAlign: "left" }}>
          {Contdata01 && Contdata01.contract ?
            <div> <h5>Patient Info</h5>
              <div>Name : {name}</div>
              <div>Father Name :{fatherName}</div>
              <div>Age :{age}</div>
              <div>Address :{address}</div>
              <div>CNIC :{cnic}</div>
              <div>Gender :{gender}</div>
              <div className="row">
                <div className="col">
                  <h5> Patient Medical Files </h5>
                </div>
              </div></div> : <i className="fa fa-spinner fa-spin fa-4x" />}
        </div>
        <div className="col">
          <form onSubmit={grantAccess}>
            <h5>Grant Access</h5>
            <input value={account} required className="form-control" placeholder="Enter Doctor Address" onChange={(e) => setAccount(e.target.value)} />
            <button className="btn btn-primary mt-2" type="submit" disabled={grantAccess01 === false ? false : true}>  {grantAccess01 === false ? "Grant Access" : <i className="fa fa-spinner fa-spin" />} </button>
          </form>
        </div>
        <div className="col">
          <h5>Upload files</h5>
          <form onSubmit={uploadFile}>
            {/* <Input className='emailId' style={{width:"100%"}} value={this.state.secret} onChange={this.onTextChange.bind(this, 'secret')} size="small" placeholder="One Time Secret"/> */}
            <input type="file" onChange={getFile}></input>
            <button className="btn btn-primary" type="submit" disabled = {upload == false ? false : true} >{upload == false ? "Upload File" : <i className="fa fa-spinner fa-spin" />} </button>
          </form>
        </div>
      </div>
      <div className="row" style={{ display: 'flex', justifyContent: 'space-even', padding: '5px' }}>
        {files ? (files.map((fhash, i) => (
          <div className="col-4" key={i} style={{ padding: '5px' }}>
            <FileCard
              hash={fhash}
              files={files}
              filesname={filename}
              // showfile={showFile(fhash,true)}
              image={`https://ipfs.io/ipfs/${files[i][2]}`}
            />
          </div>
        ))) : <i className="fa fa-spinner fa-spin fa-4x" />}
      </div>
    </div>
  );
}
export default PatientDashboard;
