import React, { useState } from 'react';
import { Button, Card } from 'antd';
import axios from 'axios'
import fileDownload from 'js-file-download'
import FileViewer from 'react-file-viewer';
import DocViewer from "react-doc-viewer";
import { Modal } from 'react-bootstrap';
function FileCard(props) {
  const [showModal, setShow] = useState(false);
  const handleClick = (url, filename) => {
    axios.get(url, {
      responseType: 'blob',
    })
      .then((res) => {
        fileDownload(res.data, filename)
      })
  }
  const toggleFunc = () => {
    setShow(!showModal)
  }
  return (
    <div>
      <Modal show={showModal} >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <Modal.Header>
              <Modal.Title> Preview </Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-body'>

              <iframe
                title={''}
                src={props.image}
                style={{width:'400px', height:'500px'}}
              >
              </iframe>
            </Modal.Body>
            <Modal.Footer >
              <button type="button" className="btn btn-secondary" onClick={toggleFunc} >Close</button>
            </Modal.Footer>
          </div>
        </div>
      </Modal>
      <Card title={props.hash[0]} bordered={true}>
        <h4 style={{ wordWrap: 'break-word' }} >filehash: {props.hash[2]}</h4>
        <h4>filetype: {props.hash[1]}</h4>
        <div> <img src={props.image} style={{ height: 150, width: 150 }} /></div>
        <button style={{ margin: 15 }} className='btn btn-primary' onClick={() => handleClick(`${props.image}`, `${props.hash[0]}`)}> Download File </button>
        <button className='btn btn-primary' onClick={toggleFunc} > Preview File </button>
      </Card>
    </div>
  );
}
export default FileCard;