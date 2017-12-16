const date = new Date();

const initialState = {
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDate(),
  weekDay: date.getDay(),
};

export default (state = initialState, action) => {
  switch(action.type) {
    case 'CALENDAR_CHANGE_DATE':
      return changeDate(state, action);
    default:
      return state;
  }
}

const changeDate = (state, action) => {
  const date = new Date(
    action.year || state.year,
    action.month || state.month,
    action.day || state.day,
  );
  return {
    ...state,
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    weekDay: date.getDay(),
  };
}