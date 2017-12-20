const initialState = {
  items:[
    /* Mocked tasks */
    {
      id: 1,
      title: "TEDx Talk (2016 web design trends)",
      description: "I'm going to TEDx talk",
      completed: false,
      date: new Date(2017,11,17),
      startTime: { hours: 14, minutes: 0 },
      endTime: { hours: 16, minutes: 30 },
      category: {
        id: 1,
        color: "#B287DD",
        name: "Social",
      },
    },
    {
      id: 2,
      title: "Buy a new telescope",
      completed: true,
      date: new Date(2017,11,17),
      category: {
        id: 2,
        color: "#de0f17",
        name: "Shopping",
      },
    },
    {
      id: 3,
      title: "Dinner at the restaurant",
      description: "Get dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hoboGet dressed not like a hobo",
      completed: false,
      date: new Date(2017,11,17),
      startTime: { hours: 19, minutes: 0 },
      category: {
        id: 1,
        color: "#B287DD",
        name: "Social",
      },
    },
    {
      id: 4,
      title: "Buy milk",
      completed: false,
      date: new Date(2017,11,18),
      startTime: { hours: 19, minutes: 0 },
      category: {
        id: 2,
        color: "#de0f17",
        name: "Shopping",
      },
    }
  ],
  categories: [
    {
      id: 1,
      name: 'Social',
      color: '#B287DD',
    },
    {
      id: 2,
      name: 'Shopping',
      color: '#de0f17',
    }
  ]
};

export default (state = initialState, action) => {
  switch(action.type) {
    case 'COMPLETE_TASK':
      return completeTask(state, action);
    case 'DELETE_TASK':
      return deleteTask(state, action);
    case 'INSERT_TASK':
      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.task,
            id: state.items.length+1
          }
        ],
      };
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