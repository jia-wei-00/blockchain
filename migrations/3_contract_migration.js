const JTOKEN = artifacts.require("JTOKEN");
const RANDOMNFT = artifacts.require("RANDOMNFT");
const MarketPlace = artifacts.require("MarketPlace");

module.exports = function (deployer) {
  deployer.deploy(JTOKEN).then(function () {
    return deployer.deploy(RANDOMNFT, JTOKEN.address).then(function () {
      return deployer.deploy(MarketPlace, RANDOMNFT.address, JTOKEN.address);
    });
  });
};
