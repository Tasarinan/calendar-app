import moment from 'moment';

const initialState = {
  date: moment(),
  focusedDate: moment(),
};

export default (state = initialState, action) => {
  switch(action.type) {
    case 'CHANGE_DATE':
    return {
      ...state,
      date: action.date,
    }
    case 'CHANGE_FOCUSED_DATE':
      return {
        ...state,
        focusedDate: action.date,
      }
    default:
      return state;
  }
}