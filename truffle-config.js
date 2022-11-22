var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "idle mixture boat tell space exact finish direct zebra infant response convince";
const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
 networks: {
  development: {
   host: "127.0.0.1",
   port: 8545,
   network_id: "*"
  },
  goerli: {
      provider: () => new HDWalletProvider(mnemonic, "https://goerli.infura.io/v3/dd1adc1111c7482f9d6e043823693271"),
      network_id: 5,
  },
  sepolia: {
    provider: () => new HDWalletProvider(mnemonic, "https://sepolia.infura.io/v3/dd1adc1111c7482f9d6e043823693271"),
    network_id: 11155111,
}
 }
};
