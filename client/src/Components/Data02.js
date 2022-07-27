import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Card } from 'antd';
import {Tag} from 'antd';
import fileDownload from 'js-file-download'
import axios from 'axios';

function Data02 (props){
        const handleClick = (url, filename) => {
            console.log('url',url)
            console.log('filename',filename)
            axios.get(url, {
              responseType: 'blob',
            })
            .then((res) => {
              fileDownload(res.data, filename)
            })
          }
        
    return(
            <div className="row" style={{display:'flex',justifyContent:'space-even',padding:'5px'}}>
              {props.data.map((fhash, i) => (
                <div className="col-6" key={i} style={{padding:'5px'}}>
                  <Card title={props.data[i].file_name} bordered={true}>
                    <h4 style={{ wordWrap:'break-word' }} >filehash: {props.data[i].file_hash}</h4>
                    <h4>filetype: {props.data[i].file_type}</h4>
                   <div> <img src={`https://ipfs.io/ipfs/${props.data[i].file_hash}`} style={{height:150, width:150}} /></div>
                   <button style={{margin:15}} className='btn btn-primary' onClick={()=>handleClick(`https://ipfs.io/ipfs/${props.data[i].file_hash}`, `${props.data[i].file_name}`)}> Download File </button>
                   </Card>
                </div>
              ))}
            

            {/* {
            props.data01[3].map((fhash, i) => {
                    // let filename = this.state.files[i]?this.state.files[i][0]:null;
                    //let diplayImage = "/ipfs_file?hash="+fhash+"&file_name="+filename;
                    // let diplayImage = `https://ipfs.io/ipfs/${this.state.files[i][2]}`;
                    // "&role=patient&token="+token+"&patient_address="+web3.eth.accounts[0];
                    //let diplayImage=null;
                    // let fileProps = {fhash, filename, diplayImage, i};
                    // console.log("fhash", fhash);
                    // console.log("filename", data[3][i].file_hash);
                    <div className='col'>
                      <div>{props.data01[3][i].file_hash}</div>
                    </div>
                    // return <DisplayFiles that={this} props={fileProps}/>
                })
                }  */}
            </div>
    )
}
export default Data02;