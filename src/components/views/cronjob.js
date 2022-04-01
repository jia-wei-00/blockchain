import React, { useEffect } from "react";
import marketplaceService from "../../services/marketplace.service";

// constants
import Web3 from "web3";
import NFTMarket from "../../contracts/MarketPlace.json";

const Cronjob = () => {
  const createMarketplace = async () => {
    let web3 = new Web3(window.ethereum);
    // let web3 = new Web3('http://localhost:3001');
    // console.log(window.ethereum)
    const NFTMarketNetworkData = await NFTMarket.networks["97"];
    const nftMarket = new web3.eth.Contract(
      NFTMarket.abi,
      NFTMarketNetworkData.address
    );
    let allMarketItems = await nftMarket.methods.fetchMarketItems().call();
    marketplaceService.createMarketplace(allMarketItems).then((result) => {
      if (result.status) {
        console.log(result.msg);
      } else {
        console.log(result.msg);
      }
    });
  };

  useEffect(() => {
    createMarketplace();
  }, []);

  return <h5>Hello cronjob</h5>;
};

export default Cronjob;
