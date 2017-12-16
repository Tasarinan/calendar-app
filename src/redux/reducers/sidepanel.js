const date = new Date();

const initialState = {
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDate(),
  weekDay: date.getDay(),
};

export default (state = initialState, action) => {
  switch(action.type) {
    case 'SIDEPANEL_CHANGE_DATE':
      return changeDate(state, action);
    default:
      return state;
  }
}

const changeDate = (state, action) => {
  const date = new Date();
  date.setDate(action.day || state.day);
  date.setMonth(action.month || state.month);
  date.setFullYear(action.year || state.year);
  
  return {
    ...state,
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    weekDay: date.getDay(),
  };
}