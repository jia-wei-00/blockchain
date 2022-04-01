import apiCaller from './axios.service'

const stakeAudit = (
    StakeNFTID, StakeNFTOwnerAddr, StakeNFTMp, StakeNFTRarity, StakeNFTLevel, StakeNFTTokenUri, StakeNFTCreatedTime, StakeNFTTransactionHash
) => {
    return apiCaller('/stake/stakeAudit', {
        StakeNFTID, StakeNFTOwnerAddr, StakeNFTMp, StakeNFTRarity, StakeNFTLevel, StakeNFTTokenUri, StakeNFTCreatedTime, StakeNFTTransactionHash
    });
};

const cronjobStake = (
    data
) => {
    return apiCaller('/stake/cronjobStake', {
        data
    });
};

const unstakeAudit = (
    StakeNFTID, StakeNFTOwnerAddr, StakeNFTMp, StakeNFTRarity, StakeNFTLevel, StakeNFTTokenUri, StakeNFTCreatedTime, StakeNFTTransactionHash
) => {
    return apiCaller('/stake/unstakeAudit', {
        StakeNFTID, StakeNFTOwnerAddr, StakeNFTMp, StakeNFTRarity, StakeNFTLevel, StakeNFTTokenUri, StakeNFTCreatedTime, StakeNFTTransactionHash
    });
};

const harvest = (
    harvestNftId
) => {
    return apiCaller('/stake/harvest', {
        harvestNftId
    });
};

const getHarvestAmount = (currentUserAddress) => {
    return apiCaller('/stake/getHarvestAmount', {
        currentUserAddress
    });
};

const getHashKey = () => {
    return apiCaller('/stake/retrieveHashKeyValue');
};

const getLatestStakeDate = (ownerAddress) => {
    return apiCaller('/stake/retrieveLatestStakeDate', {
        ownerAddress
    });
};

export default { // eslint-disable-line
    stakeAudit,
    cronjobStake,
    unstakeAudit,
    harvest,
    getHarvestAmount,
    getHashKey,
    getLatestStakeDate
}