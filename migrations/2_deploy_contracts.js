
var optHealthCare = artifacts.require("./optimized_healthCare.sol");
module.exports = function(deployer, network) {

  deployer.deploy(optHealthCare);
  
};
