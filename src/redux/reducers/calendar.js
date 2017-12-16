const date = new Date();

const initialState = {
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDate(),
};

export default (state = initialState, action) => {
  switch(action.type) {
    case 'CALENDAR_CHANGE_DATE':
      return {
        ...state,
        year: action.year || state.year,
        month: action.month || state.month,
        day: action.day || state.day,
      };
    default:
      return state;
  }
}