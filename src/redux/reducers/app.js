const initialState = {
  loading: true,
  settings: {
    weekStart: 1,
    sidepanelDateFormat: 'Do MMMM YYYY',
    taskDateFormat: 'dddd, MMMM Do, YYYY',
  }
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
