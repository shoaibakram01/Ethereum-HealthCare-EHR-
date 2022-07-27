import React from 'react';
import { Button, Card,Icon} from 'antd';
import axios from 'axios'
import PopUp from './common/popup';
import fileDownload from 'js-file-download'
    function FileCard01(props){

        const handleClick = (url, filename) => {
            axios.get(url, {
              responseType: 'blob',
            })
            .then((res) => {
              fileDownload(res.data, filename)
            })
          }
        return(
            <div>
                <Card title={props.hash[0]} bordered={true}>
                    <h4 style={{ wordWrap:'break-word' }} >filehash: {props.hash[2]}</h4>
                    <h4>filetype: {props.hash[1]}</h4>
                   <div> <img src={props.image} style={{height:150, width:150}} /></div>
                   <button style={{margin:15}} className='btn btn-primary' onClick={() => handleClick(`${props.image}`, `${props.hash[0]}`)}> Download File </button>
                </Card>
            </div>
        );
    }
    export default FileCard01;