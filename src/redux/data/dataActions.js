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

      await dispatch(
        fetchDataSuccess({
          getJTokenBalance,
          getPlayerNFT,
          getSellingNFT,
        })
      );
    } catch (err) {
      console.log(err);
      await dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
