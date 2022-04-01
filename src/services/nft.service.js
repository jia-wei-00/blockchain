import apiCaller from './axios.service'

const mintNFT = (
    NFTID, NFTOwnerAddr, NFTMp, NFTRarity, NFTLevel, NFTTokenUri, NFTCreatedTime, NFTUnboxTime, NFTRevealed, NFTStaking, NFTStatus, TransactionHash
) => {
    return apiCaller('/nft/mintNFT', {
        NFTID, NFTOwnerAddr, NFTMp, NFTRarity, NFTLevel, NFTTokenUri, NFTCreatedTime, NFTUnboxTime, NFTRevealed, NFTStaking, NFTStatus, TransactionHash
    });
};

const speedUpNFT = (
    NFTID, NFTSender, NFTStatus, TransactionHash
) => {
    return apiCaller('/nft/speedUpNFT', {
        NFTID, NFTSender, NFTStatus, TransactionHash
    });
};

const openNFT = (
    NFTID, NFTSender, NFTStatus, TransactionHash
) => {
    return apiCaller('/nft/openNFT', {
        NFTID, NFTSender, NFTStatus, TransactionHash
    });
};

const upLevelNFT = (
    NFTID, NFTSender, NFTPrevLevel, NFTNewLevel, NFTStatus, TransactionHash
) => {
    return apiCaller('/nft/upLevelNFT', {
        NFTID, NFTSender, NFTPrevLevel, NFTNewLevel, NFTStatus, TransactionHash
    });
};

const historyNFT = (nftid) => {
    return apiCaller('/nft/historyNFT', {
        nftid
    });
};

const retrieveSpeedUpPrice = () => {
    return apiCaller('/public/retrieveSpeedUpPrice');
}

const getLevelUpPrice = (nftid) => {
    return apiCaller('/public/retrieveUpLevelCost', {
        nftid
    });
};

export default {  // eslint-disable-line
    mintNFT,
    speedUpNFT,
    openNFT,
    upLevelNFT,
    historyNFT,
    retrieveSpeedUpPrice,
    getLevelUpPrice
}