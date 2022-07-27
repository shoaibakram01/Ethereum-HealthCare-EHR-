# Ethereum-HealthCare-EHR-
The healthcare industry has seen many technological advancements, but supply chain management is still based on pen-and-paper management or, with some development, a digital method of managing inventory online and tracking it effectively, which is still not up to par and completely dependable. In order to solve this problem, we are utilising blockchain technology, which provides a superior method of tracking and tracing information through a peer-to-peer distributed, secure, and shared ledger of the blockchain network.

# Install Following Packages

* Install Metamask as Google Chrome extension.
* "Truffle" v5.4.29
* "Node" v16.15.0

Move to the Project Directory and Install Following with npm
  * "bootstrap": "^5.1.3",
  * "truffle-hdwallet-provider": "^1.0.17"
  
Move to the **client** directory and Install Following with npm
  * "antd": "^3.9.0",
  * "axios": "^0.19.2",
  * "bootstrap": "^4.4.1",
  * "bs58": "^4.0.1",
  * "ipfs-api": "^26.1.2",
  * "js-file-download": "^0.4.12",
  * "react": "16.11.0",
  * "react-bootstrap": "^1.0.0",
  * "react-dom": "16.11.0",
  * "react-router-dom": "^5.3.0",
  * "react-scripts": "3.2.0",
  * "web3": "1.2.2"

# Steps to Run Project
1) Create an Account on [Infura](https://infura.io/) .It will be used to deploy smart contract to Ethereum testnets by using truffle.
2) Create a new project, change the endpoint to Rinkeby and copy the URL of the endpoint for Rinkeby.

![1_XabgyDhjYDldPd2aWZNXIg](https://user-images.githubusercontent.com/81964699/181205861-13a98fad-0b87-41e7-bfd8-011784eff564.png)
![1_nFROufojpg8okGQYXcdclA](https://user-images.githubusercontent.com/81964699/181206078-6b70f19d-2de5-4865-a74b-a8dd43e4c439.png)
![1_e4uTAJW7Nn44FUx9AgxPEA](https://user-images.githubusercontent.com/81964699/181206209-46383e63-a320-4662-9af6-c80b77a5d40f.png)

3) Edit ___truffle-config.js___  to set up the truffle-hdwallet-provider and the connection to the Rinkeby network. Then paste the phrase of your metamask Account & Infura Access Token 
```
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "orange apple banana ...";
const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
 networks: {
  development: {
   host: "127.0.0.1",
   port: 8545,
   network_id: "*"
  },
  rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/<INFURA_Access_Token>"),
      network_id: 4,
  }
 }
};
```

4) Goto Project Directory and run ___"truffle migrate --network rinkeby"___ on command prompt.
5) Goto Client directory and run ___"npm start"___ to start react server.
6) Project will be open in your browser.

Execution will start from __App.js__ file in client directory.
