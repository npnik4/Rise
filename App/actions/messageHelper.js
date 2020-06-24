export const verifyTasks = () => {
  return (dispatch, getState) => {
    dispatch({type: 'REMOVE_MESSAGE'});
    const state = getState();
    const profileDays = state.profile.disabledDays;
    const tasks = state.Tasks.tasks;
    const taskDays = filterOutDays(tasks);
    let message = 'Profile is not set up for ';
    let flag = false;
    taskDays.forEach((day) => {
      if (!profileDays.includes(day)) {
        message = message + day + ', ';
        flag = true;
      }
    });
    console.log(message);
    message = message + 'but tasks are. ';
    if (flag) {
      dispatch({type: 'ADD_MESSAGE', value: {type: 'task', info: message}});
    }
    dispatch(verifyProfile());
  };
};

export const verifyProfile = () => {
  return (dispatch, getState) => {
    const state = getState();
    const profileDays = state.profile.disabledDays;
    const tasks = state.Tasks.tasks;
    const taskDays = filterOutDays(tasks);
    let message = 'Tasks are not set up for ';
    let flag = false;
    profileDays.forEach((day) => {
      if (!taskDays.includes(day)) {
        message = message + day + ', ';
        flag = true;
      }
    });
    message = message + 'Please create tasks, for full functionality.';
    console.log(message);
    if (flag) {
      dispatch({type: 'ADD_MESSAGE', value: {type: 'profile', info: message}});
    }
  };
};

function filterOutDays(tasks) {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thrusday',
    'Friday',
    'Saturday',
  ];
  let daysWithTasks = [];
  days.forEach((day) => {
    if (tasks[0][day].length > 0) {
      daysWithTasks.push(day);
    }
  });
  return daysWithTasks;
}
