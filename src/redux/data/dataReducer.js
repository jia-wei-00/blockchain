const initialState = {
  loading: false,
  getJTokenBalance: "",
  approveMarketplace: "",
  checkApprove: false,
  retrieveMarketplace: [],
  getPlayerNFT: [],
  getSellingNFT: [],
  error: false,
  errorMsg: "",
  balance: "",
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_DATA_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "CHECK_DATA_SUCCESS":
      return {
        ...initialState,
        loading: false,
        getJTokenBalance: action.payload.getJTokenBalance,
        checkApprove: action.payload.checkApprove,
        retrieveMarketplace: action.payload.retrieveMarketplace,
        getPlayerNFT: action.payload.getPlayerNFT,
        getSellingNFT: action.payload.getSellingNFT,
        approveMarketplace: action.payload.approveMarketplace,
        balance: action.payload.balance,
      };
    case "CHECK_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
