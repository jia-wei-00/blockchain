// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = (account) => {
  const MarketPlaceAddress = "0x8e509Ce888766305a9065CEC31F5f57446F4194B";
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let getJTokenBalance = await store
        .getState()
        .blockchain.JTOKEN.methods.balanceOf(account)
        .call();
      let getPlayerNFT = await store
        .getState()
        .blockchain.RANDOMNFT.methods.getAllTokensForUser(account)
        .call();
      let getSellingNFT = await store
        .getState()
        .blockchain.MARKETPLACE.methods.fetchSellingItems(account)
        .call();
      let checkApprove = await store
        .getState()
        .blockchain.RANDOMNFT.methods.isApprovedForAll(account, MarketPlaceAddress)
        .call();
      let retrieveMarketplace = await store
        .getState()
        .blockchain.MARKETPLACE.methods.fetchMarketItems()
        .call();
      let approveMarketplace = await store
        .getState()
        .blockchain.JTOKEN.methods.allowance(account, MarketPlaceAddress)
        .call();
      let balance = await store
        .getState()
        .blockchain.JTOKEN.methods.balanceOf(account)
        .call();

      await dispatch(
        fetchDataSuccess({
          getJTokenBalance,
          getPlayerNFT,
          getSellingNFT,
          checkApprove,
          retrieveMarketplace,
          approveMarketplace,
          balance,
        })
      );
    } catch (err) {
      console.log(err);
      await dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
