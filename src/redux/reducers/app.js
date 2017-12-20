const initialState = {
  loading: true,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case 'LOADING_STOP':
      return {
        ...state,
        loading: false,
      };
    case 'LOADING_START':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
