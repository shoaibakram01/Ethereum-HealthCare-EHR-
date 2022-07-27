import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Input } from "antd";
import ipfs from "./ipfs-util";
import FileCard from "./FileCard";
function PatientDashboard(props) {
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [cnic, setCnic] = useState("");
  const [gender, setGender] = useState("");
  const [buffer, setBuffer] = useState("");
  const [filename, setFilename] = useState("");
  const [filetype, setFiletype] = useState("");
  const [files, setFiles] = useState([]);
  const [showPop,setShowPop]=useState([]);
  const [shows,setShows]=useState(true);
  const [account,setAccount]=useState('');
  useEffect(() => {
    console.log("patient dashboard");
    loadPatient();
    loadFiles();
  }, [files]);
  const loadPatient = async () => {
    //console.log(contract);
    let res = await props.Contract["OPT"].methods
      .getPatientInfo()
      .call({ from: props.Account01[0] });
    setName(res[0]);
    setFatherName(res[1]);
    setAge(res[2]);
    setAddress(res[3]);
    setCnic(res[4]);
    setGender(res[5]);

    // this.setState({name:res[0],age:res[2],files:res[3],doctor_list:res[4]})
    // () => {
    //let  { files } = this.state;
    // this.loadFiles();
    // this.getFileInfo("patient", files, "", (filesInfo) => {
    //     this.setState({filesInfo});
    // });
    // });
    //this.loadFiles();
  };
  const getFile = (event) => {
    event.preventDefault();
    console.log("getfile");
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setBuffer(Buffer(reader.result), file);
      setFilename(file.name);
      setFiletype(file.type);
      // setFile01({...file01,name:file.name});
      // setFile01({...file01,type:file.type});
      // console.log("buffer786", file01);
    };
  };
  const uploadFile = (event) => {
    event.preventDefault();
    ipfs.files.add(buffer, (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      // console.log("filename before Uploading :", filename);
      // console.log("filetype before  Uploading :", filetype);
      else {
        updateFileHash(filename, filetype, res[0].hash);
      }
    });
  };

  const updateFileHash = async (name, type, ipfshash) => {
    //sending transaction and storing result to state variables

    let res = await props.Contract["OPT"].methods
      .addUserFiles(name, type, ipfshash)
      .send({ from: props.Account01[0] });
    // console.log(res);
    if (res) alert("file upload successful");
    else alert("file upload unsuccessful");
  };
  const loadFiles = async () => {
    const files = await props.Contract["OPT"].methods
      .getUserFiles(props.Account01[0])
      .call({ from: props.Account01[0] });
    console.log("files", files);
    if (files[0]) setFiles(files);
    // console.log("files :", files);
  };
 const showFile=(hash, flag)=> {
    // let { files, showPopup } = this.state;
    if(files.indexOf(hash) > -1){
        let showPopupTemp = showPop.slice(0);
        console.log("showPopupTemp", showPopupTemp);
        // showPopupTemp[files.indexOf(hash)] = flag;
        // setShowPop(showPopupTemp);
        // this.setState({showPopup:showPopupTemp});
    }
}

const grantAccess= async ()=>{
  if(account){
    let res = await props.Contract["OPT"].methods.grantAccessToDoctor(account)
    .send({"from":props.Account01[0]});
    
    if(res) {
        // message.success('access successful');
        console.log('access granted');
        setAccount('');
    }
}

}

  return (
    <div className="container">
      <h4>Patient Dashoard</h4>
      <div className="row">
        <div className="col" style={{ textAlign: "left" }}>
          <h5>Patient Info</h5>
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
          </div>
        </div>
        <div className="col">
          <form onSubmit={grantAccess}>
              <h5>Grant Access</h5>
              <input value={account} required className="form-control" placeholder="Enter Doctor Address" onChange={(e)=>setAccount(e.target.value)} />
              <button  className="btn btn-primary mt-2" type="submit"> Grant Access </button>
              </form>
        </div>
        <div className="col">
          <h5>Upload files</h5>
          <form onSubmit={uploadFile}>
            {/* <Input className='emailId' style={{width:"100%"}} value={this.state.secret} onChange={this.onTextChange.bind(this, 'secret')} size="small" placeholder="One Time Secret"/> */}
            <input type="file" onChange={getFile}></input>
            <input className="btn btn-primary" type="submit"></input>
          </form>
        </div>
      </div>
      <div className="row" style={{display:'flex',justifyContent:'space-even',padding:'5px'}}>
              {files.map((fhash, i) => (
                <div className="col-4" key={i} style={{padding:'5px'}}>
                  <FileCard  
                    hash={fhash}
                    files={files}
                    filesname={filename}
                    // showfile={showFile(fhash,true)}
                    image={`https://ipfs.io/ipfs/${files[i][2]}`}
                  />
                </div>
              ))}
            </div>
    </div>
  );
}
export default PatientDashboard;
