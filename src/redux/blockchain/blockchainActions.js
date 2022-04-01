// constants
import Web3 from "web3";
import JTOKEN from "../../contracts/JTOKEN.json";
import RANDOMNFT from "../../contracts/RANDOMNFT.json";
import MARKETPLACE from "../../contracts/MarketPlace.json";

// log
import { fetchData } from "../data/dataActions";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

const chainChanged = () => {
  return {
    type: "CHAIN_CHANGED",
  };
};

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    //CHECK WHETHER METAMASK INSTALLED
    if (window.ethereum) {

      let web3 = new Web3(window.ethereum);

      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: `0x${Number(97).toString(16)}`,
              chainName: "Binance Smart Chain Testnet",
              nativeCurrency: {
                name: "Binance Chain Native Token",
                symbol: "tBNB",
                decimals: 18,
              },
              rpcUrls: [
                "https://data-seed-prebsc-1-s1.binance.org:8545",
                "https://data-seed-prebsc-2-s1.binance.org:8545",
                "https://data-seed-prebsc-1-s2.binance.org:8545",
                "https://data-seed-prebsc-2-s2.binance.org:8545",
                "https://data-seed-prebsc-1-s3.binance.org:8545",
                "https://data-seed-prebsc-2-s3.binance.org:8545",
              ],
              blockExplorerUrls: ["https://testnet.bscscan.com"],
            },
          ],
        });

        //GET ACCOUNT THAT CONNECTED
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const networkId = await window.ethereum.request({
          method: "net_version",
        });
        const JTOKENNetworkData = await JTOKEN.networks[networkId];
        const RANDOMNFTNetworkData = await RANDOMNFT.networks[networkId];
        const MarketPlaceNetworkData = await MARKETPLACE.networks[networkId];
        if (
          JTOKENNetworkData ||
          RANDOMNFTNetworkData ||
          MarketPlaceNetworkData
        ) {
          const JToken = new web3.eth.Contract(
            JTOKEN.abi,
            JTOKENNetworkData.address
          );
          const RandomNFT = new web3.eth.Contract(
            RANDOMNFT.abi,
            RANDOMNFTNetworkData.address
          );
          const marketPlace = new web3.eth.Contract(
            MARKETPLACE.abi,
            MarketPlaceNetworkData.address
          );

          dispatch(
            connectSuccess({
              //CURRENT CONNECTED ACCOUNT
              account: accounts[0],
              JTOKEN: JToken,
              RANDOMNFT: RandomNFT,
              MarketPlace: marketPlace,
              web3: web3,
            })
          );
          // Add listeners start
          window.ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          window.ethereum.on("chainChanged", async () => {
            let newChain = await window.ethereum.request({
              method: "net_version",
            });
            if (newChain !== "97") {
              dispatch(chainChanged());
            } else {
              dispatch(
                connectSuccess({
                  //CURRENT CONNECTED ACCOUNT
                  account: accounts[0],
                  JTOKEN: JToken,
                  RANDOMNFT: RandomNFT,
                  MarketPlace: marketPlace,
                  web3: web3,
                })
              );
            }
          });
          // Add listeners end
        } else {
          dispatch(connectFailed("Change network to BSC."));
        }
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};
