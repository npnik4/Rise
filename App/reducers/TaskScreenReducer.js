import {PURGE} from 'redux-persist';

const initialState = {
  tasks: [
    {
      Sunday: [],
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thrusday: [],
      Friday: [],
      Saturday: [],
    },
  ],
  selectedTask: null,
  selectedDay: 'Monday',
};

const Tasks = (state = initialState, action) => {
  let allTasks = null;
  let day = null;
  switch (action.type) {
    case 'SET_SELECTED_TASK':
      return {
        ...state,
        selectedTask: action.value,
      };
    case 'ADD_TASK':
      allTasks = Object.assign([], state.tasks);
      const targetDay = state.selectedDay;
      const newTask = action.value;
      newTask.index = allTasks[0][targetDay].length;
      allTasks[0][targetDay].push(newTask);
      return Object.assign({}, state, {
        tasks: allTasks,
      });
    case 'ADD_TASK_MULTI':
      allTasks = Object.assign([], state.tasks);
      const targetDays = action.days;
      const newTasks = action.value;
      targetDays.forEach((day) => {
        newTasks.index = allTasks[0][day].length;
        allTasks[0][day].push(newTasks);
      });
      return Object.assign({}, state, {
        tasks: allTasks,
      });
    case 'EDIT_TASK':
      const newT = action.value;
      const targetD = state.selectedDay;
      allTasks = Object.assign([], state.tasks);
      const index = state.selectedTask;
      newT.index = index;
      if (allTasks && index != null) {
        allTasks[0][targetD][index] = newT;
      }
      return Object.assign({}, state, {
        tasks: allTasks,
        selectedTask: null,
      });
    case 'DELETE_TASK':
      let delIndex = state.selectedTask;
      day = state.selectedDay;
      allTasks = Object.assign([], state.tasks);
      if (allTasks && delIndex != null) {
        allTasks[0][day].splice(delIndex, 1);
      }
      return Object.assign({}, state, {
        tasks: allTasks,
        selectedTask: null,
      });
    case 'SET_SELECTED_DAY':
      return {
        ...state,
        selectedDay: action.value,
      };
    case 'SET_ORDERED':
      allTasks = Object.assign([], state.tasks);
      day = state.selectedDay;
      let newOrderTasks = action.value;
      allTasks[0][day] = newOrderTasks;
      return Object.assign({}, state, {
        tasks: allTasks,
      });
    case PURGE:
      console.log('Purge tasks');
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default Tasks;
