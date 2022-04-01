import apiCaller from './axios.service'

const blockChainErrorLog = (err, name) => {
    return apiCaller('/errorLog/blockChainErrorLog', {
        err,
        name
    });
};


export default { // eslint-disable-line
    blockChainErrorLog 
}