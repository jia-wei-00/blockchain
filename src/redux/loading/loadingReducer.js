const initialState = {
  loading: false,
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOADING_TRUE":
      return {
        ...initialState,
        loading: true,
      };
    case "SET_LOADING_FALSE":
      return {
        ...initialState,
        loading: false,
      };
    default:
      return state;
  }
};

export default loadingReducer;
