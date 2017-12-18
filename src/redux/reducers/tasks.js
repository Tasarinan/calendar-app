const initialState = {
  items:[
    /* Mocked tasks */
    {
      id: 1,
      title: "TEDx Talk (2016 web design trends)",
      description: "I'm going to TEDx talk",
      completed: false,
      date: new Date(2017,11,17),
      startTime: new Date(2017,11,17,14,0,0),
      endTime: new Date(2017,11,17,16,30,0),
      bubbleColor: "#B287DD",
      category: "Social",
    },
    {
      id: 2,
      title: "Buy a new telescope",
      completed: true,
      date: new Date(2017,11,17),
      bubbleColor: "#de0f17",
      category: "Shopping",
    },
    {
      id: 3,
      title: "Dinner at the restaurant",
      description: "Get dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hobo",
      completed: false,
      date: new Date(2017,11,17),
      startTime: new Date(2017,11,17,19,0,0),
      bubbleColor: "#B287DD",
      category: "Social",
    },
    {
      id: 4,
      title: "Buy milk",
      completed: false,
      date: new Date(2017,11,18),
      startTime: new Date(2017,11,18,19,0,0),
      bubbleColor: "#de0f17",
      category: "Shopping",
    }
  ]
};

export default (state = initialState, action) => {
  switch(action.type) {
    case 'COMPLETE_TASK':
      return completeTask(state, action);
    case 'DELETE_TASK':
      return deleteTask(state, action);
    default:
      return state;
  }
}

const completeTask = (state, action) => {
  const index = state.items.findIndex(t => t.id === action.id);
  const task = state.items[index];
  return {
    ...state,
    items: [
      ...state.items.slice(0, index),
      {
        ...task,
        completed: action.completed,
      },
      ...state.items.slice(index+1),
    ]
  };
}

const deleteTask = (state, action) => {
  const index = state.items.findIndex(t => t.id === action.id);
  return {
    ...state,
    items: [
      ...state.items.slice(0, index),
      ...state.items.slice(index+1),
    ]
  };
}