import React, { Component } from 'react';
import {  Button, Input, Upload,Icon, message, Row, Col, Tag, Card, Collapse } from 'antd';

 import DisplayFiles from "./common/display_file";
import ipfs from "./ipfs-util"
import axios from "axios";
const Panel = Collapse.Panel;
 const Dragger = Upload.Dragger;

class Patient extends Component {

    constructor(props){
        super(props);
    }
    contract =this.props.contract['OPT'];
    accounts =this.props.Acc;

    state = {
        name: "",
        age: 0,
        files: [],
        doctor_list: [],
        filesInfo:[],
        showPopup:[],
        doctorId: null,
        secret: null,
        visible: false,
        loaded:false,
        buffer:null,
        file:null
    }
     updateFileHash = async (name,type,ipfshash) => {
        
       //sending transaction and storing result to state variables
	     
        let res = await this.contract.methods.addUserFiles(name,type,ipfshash).send({"from":this.accounts[0]});
            console.log(res);
        if(res)
            console.log("file upload successful");
        else
            console.log("file upload unsuccessful");
        
        
    }
    
      
    componentDidMount(){
        
        //if(!this.state.loaded)
            this.loadPatient();
        
        //this.fileProps.onChange.bind(this);
    }


    async loadFiles(){
        const files = await this.contract.methods.getUserFiles(this.accounts[0]).call({from:this.accounts[0]});
        console.log('files',files);
        if(files[0])
        this.setState({files:files});

    }
    async loadPatient (){
        //console.log(contract);  
        let res = await this.contract.methods.getPatientInfo().call({from :this.accounts[0]});

        this.setState({name:res[0],age:res[2],files:res[3],doctor_list:res[4]},
        () => {
            //let  { files } = this.state;
            this.loadFiles();
            // this.getFileInfo("patient", files, "", (filesInfo) => {
            //     this.setState({filesInfo});
            // });
        });
        //this.loadFiles();
      
    }

    async grantAccess(){
        
        
        if(this.state.doctorId){
            let res = await this.contract.methods.grantAccessToDoctor(this.state.doctorId)
            .send({"from":this.accounts[0]});
            
            if(res) {
                message.success('access successful');
                this.setState({doctorId:null});
            }
        }
    }

    onTextChange(type, e){
        if(e && e.target)
            this.setState({[type]:e.target.value});
    }

  
    async uploadFile(event)
    {
        event.preventDefault();

        ipfs.files.add(this.state.buffer,(err,res)=>{
            if(err){
                console.error(err)
                return 
            }
            
           this.updateFileHash(this.state.file.name,this.state.file.type,res[0].hash)
        })
    }
    getFile(event)
    {
        event.preventDefault();
        console.log("getfile");
        const file = event.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend =() =>{
            this.setState({buffer:Buffer(reader.result),file});
            
            console.log('buffer',file);
        }
    }
    showFile(hash, flag) {
        let { files, showPopup } = this.state;
        if(files.indexOf(hash) > -1){
            let showPopupTemp = showPopup.slice(0);
            showPopupTemp[files.indexOf(hash)] = flag;
            this.setState({showPopup:showPopupTemp});
        }
    }

    render() {
        let { name, age, files, doctor_list } = this.state;
        // after loading patient's info html template will diplay along with files
        this.uploadFile.bind(this);
        this.getFile.bind(this);
        //this.loadPatient();
        return (
            <div>
                <Row gutter={16} style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                    <Col className='col-3' span={6}>
                        <Card bordered={true} >
                            <div className='userDetails'  >
									<span>Name: {name}</span>
									<span>Age: {age}</span>
								
                            </div>
                        </Card>
                    </Col>
                    <Col className='col-3' span={6}>
                        <Card bordered={true}>
                            <div style={flexStyle}>
                            <Input className='emailId' style={{width:"100%"}} value={this.state.doctorId} onChange={this.onTextChange.bind(this, 'doctorId')} size="small" placeholder="Doctor Address"/>
                                <Button type="primary" onClick={this.grantAccess.bind(this)} htmlType="submit" className="login-form-button loginButton">
                                    Grant Access
                                </Button>
                            </div>
                        </Card>
                    </Col>
                    <Col className='col-3' span={6}>
                        <Card bordered={true}>
                            <form onSubmit={this.uploadFile.bind(this)}>
                            {/* <Input className='emailId' style={{width:"100%"}} value={this.state.secret} onChange={this.onTextChange.bind(this, 'secret')} size="small" placeholder="One Time Secret"/> */}
                            <input type="file" onChange={this.getFile.bind(this)}></input>
                            <input type="submit"></input>
                            </form>
                        </Card>
                    </Col>
                </Row>
                <Row >
                    <input type="button" onClick={this.loadFiles.bind(this) } value="See Files"></input>
                    <Collapse className='folderTab' defaultActiveKey={['1']}>
                        <Panel   header={<Icon type="folder" />} key="1">
                            { 
                                files.map((fhash, i) => {
                                    let filename = this.state.files[i]?this.state.files[i][0]:null;
                                    //let diplayImage = "/ipfs_file?hash="+fhash+"&file_name="+filename;
                                    let diplayImage = `https://ipfs.io/ipfs/${this.state.files[i][2]}`;
                                    // "&role=patient&token="+token+"&patient_address="+web3.eth.accounts[0];
                                    //let diplayImage=null;
                                    let fileProps = {fhash, filename, diplayImage, i};
                                    
                                    
                                    return <DisplayFiles that={this} props={fileProps}/>
                                }) 
                            }
                        </Panel>
                        <Panel header="Doctors List" key="2">
                            { 
                                doctor_list.map((doctor) => {
                                    return <Tag>{doctor}</Tag>
                                }) 
                            }
                        </Panel>
                    </Collapse>
                </Row>
            </div>
        );
    }
}

const flexStyle = {
    display:"flex", 
    flexDirection:"column"
}

const mapStateToProps = (state) => {
    return {
      //auth: state.auth,
      global_vars: state,
    };
};

export default Patient;
//export default connect(mapStateToProps, {})(Patient);
