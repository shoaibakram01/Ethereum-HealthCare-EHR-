import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Data02 from "../Data02";
import { Tag } from "antd";
// import FileCard01 from './FileCard01';
function Display_file(props) {
  let [files, setFiles] = useState();
  const [age, setAge] = useState([]);
  const [nameArray, setnameArray] = useState();
  let data;
  let names = [];
  let data01;
  useEffect(() => {
    loadFiles();
  }, [nameArray]);
  const loadFiles = async () => {
    data = await props.Contract["OPT"].methods
      .getPatientInfoForDoctor(props.patientAddress[0])
      .call({ from: props.account[0] });
      console.log("useState :",data[3][1].file_hash)
    setFiles(data[3]);
    setnameArray(data[0]);
    setAge(data[1]);
    console.log('files', files);
  }
  return (
    <div>
      <div>{nameArray}</div>
      <div >{
        files?<Data02 data={files} />:'No files'
        }</div>
      
         
       
  </div>
  );
}
export default Display_file;
