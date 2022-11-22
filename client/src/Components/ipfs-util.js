// const ipfsClient = require('ipfs-http-client');
const projectId = '2HEePHqr0yoyNTidzIls3jZiSrA';
const projectSecret = '06bc27e967d2c8f91e4a5cfcaff7560f';
const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

// const client = ipfsClient.create({
//     host: 'ipfs.infura.io',
//     port: 5001,
//     protocol: 'https',
//     headers: {
//         authorization: auth,
//     },
// });

// export default client;

// import {create} from "ipfs-http-client"; 
// const ipfsClient = require("ipfs-http-client");
// const projectId = "2HEePHqr0yoyNTidzIls3jZiSrA";
// const projectSecret = "06bc27e967d2c8f91e4a5cfcaff7560f";
// const authorization = "Basic " + btoa(projectId + ":" + projectSecret);
// // const auth =
// //     "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
//     let ipfs
//     try {
//       ipfs = create({
//         url: "https://ipfs.infura.io:5001/api/v0",
//         headers: {
//           authorization,
//         },
//       });
//     } catch (error) {
//       console.error("IPFS error ", error);
//       ipfs = undefined;
//     } 
// // const client = ipfsClient.create({
// //     host: "ipfs.infura.io",
// //     port: 5001,
// //     protocol: "https",
// //     headers: {
// //         authorization: auth,
// //     },
// // });

// export default ipfs;
// import bs58 from 'bs58'
// import axios from 'axios';

// export const getBytes32FromIpfsHash = (ipfsListing) => {
//     return "0x"+bs58.decode(ipfsListing).slice(2).toString('hex')
// }

// // Return base58 encoded ipfs hash from bytes32 hex string,
// // E.g. "0x017dfd85d4f6cb4dcd715a88101f7b1f06cd1e009b2327a0809d01eb9c91f231"
// // --> "QmNSUYVKDSvPUnRLKmuxk9diJ6yS96r1TrAXzjTiBcCLAL"

// export const getIpfsHashFromBytes32 = (bytes32Hex) => {
//     // Add our default ipfs values for first 2 bytes:
//     // function:0x12=sha2, size:0x20=256 bits
//     // and cut off leading "0x"
//     const hashHex = "1220" + bytes32Hex.slice(2)
//     const hashBytes = Buffer.from(hashHex, 'hex');
//     const hashStr = bs58.encode(hashBytes)
//     return hashStr
// }

// export const getFile = async (hash, callback) => {
//     //console.log(getIpfsHashFromBytes32(hash));
//     let res = await axios.get('/ipfs_file?hash='+hash+'&file_name=box-img-lg.png');
    
//     if(res && res.data)
//         callback(res.data);
//     else
//         callback("");
// }

const IPFS = require('ipfs-api');
const ipfs = IPFS({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization : auth,      
    }
  })
// const ipfs = new IPFS({host:'ipfs.infura.io',port:5001,protocol:'https'});
export default ipfs;