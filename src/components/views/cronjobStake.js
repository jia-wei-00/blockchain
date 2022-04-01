import React, { useEffect } from "react";
import stakeService from "../../services/stake.service";

// constants
import Web3 from "web3";
import NFTToken from "../../contracts/NFT.json";

const CronjobStake = () => {

    const getStackList = async () => {
        // let web3 = new Web3(window.ethereum);
        let provider = new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545/');
        let web3 = new Web3(provider);
        // let web3 = new Web3('http://localhost:3001');
        // console.log(window.ethereum)
        const NFTTokenNetworkData = await NFTToken.networks["97"];
        const nftToken = new web3.eth.Contract(
            NFTToken.abi,
            NFTTokenNetworkData.address
        );
        let stackList = await nftToken.methods.getStackList().call();
        let newStackList = [];
        for (var i = 0; i < stackList.length; i++) {
            let ownerAddress = await nftToken.methods.ownerOf(stackList[i][0]).call();
            let tmpStackList = [ownerAddress].concat(stackList[i])
            newStackList.push(tmpStackList.slice(0, -3))
        }
        stakeService.cronjobStake(newStackList).then((result) => {
            if (result.status) {
                console.log(result.msg);
            } else {
                console.log(result.msg);
            }
        });
    };

    useEffect(() => {
        getStackList();
    }, []);

    return <h5>Hello cronjob</h5>;
};

export default CronjobStake;
