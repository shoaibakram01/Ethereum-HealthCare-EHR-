import React, { useEffect, useState } from "react";
import ContractContext from './contractContext';
import optHealthCare from '../../contracts/optimized_healthCare.json'
// import optHealthCare from "../contracts/optimized_healthCare.json"
// import getWeb3 from "../getWeb3";
import getWeb3 from "../../getWeb3";

const ContractState = (props) => {
  const [web3, setweb3] = useState()
  const [account, setaccount] = useState();
  const [contract, setContract] = useState();
  useEffect(() => {
    getContract();
  }, [account, contract])
  const getContract = async () => {
    try {
      var web3 = await getWeb3();
      var tmpcont = [];
      setaccount(await web3.eth.getAccounts());
      const networkId = await web3.eth.net.getId();
      var deployedNetwork = optHealthCare.networks[networkId];
      tmpcont['OPT'] = new web3.eth.Contract(
        optHealthCare.abi,
        deployedNetwork && deployedNetwork.address,
      );
      setweb3(web3);
      setContract(tmpcont);
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }
  const states = {
    account: account,
    contract: contract
  }
  // console.log("Contract state are set", account, contract)
  return (<ContractContext.Provider value={states}>
    {props.children}
  </ContractContext.Provider>)
}
export default ContractState;