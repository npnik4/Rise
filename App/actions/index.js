export function addTask(mins, taskName) {
  let tempObj = {time: mins, title: taskName};
  return {
    type: 'ADD_TASK',
    value: tempObj,
  };
}

export function addTaskMutli(mins, taskName, days) {
  let tempObj = {time: mins, title: taskName};
  console.log('obj', tempObj);
  return {
    type: 'ADD_TASK_MULTI',
    value: tempObj,
    days: days,
  };
}

export function setSelectedTask(index) {
  return {
    type: 'SET_SELECTED_TASK',
    value: index,
  };
}

export function setOrdered(data) {
  return {
    type: 'SET_ORDERED',
    value: data,
  };
}

export function editTask(mins, taskName) {
  let tempObj = {time: mins, title: taskName};
  return {
    type: 'EDIT_TASK',
    value: tempObj,
  };
}

export function deleteTask() {
  return {
    type: 'DELETE_TASK',
  };
}

export function setSelectedDay(day) {
  return {
    type: 'SET_SELECTED_DAY',
    value: day,
  };
}

export function setSelectedDays(day) {
  return {
    type: 'SET_SELECTED_DAYS',
    value: day,
  };
}

export function clearDays() {
  return {
    type: 'CLEAR_DAYS',
  };
}

export function setTransMode(mode) {
  return {
    type: 'SET_TRANS_MODE',
    value: mode,
  };
}

export function addProfile(obj) {
  return {
    type: 'ADD_PROFILE',
    value: obj,
  };
}

export function editProfile(obj) {
  return {
    type: 'EDIT_PROFILE',
    value: obj,
  };
}

export function setSelectedProfile(id) {
  return {
    type: 'SET_PROFILE_SELECTED',
    value: id,
  };
}

export function deleteProfile(days) {
  return {
    type: 'DELETE_PROFILE',
    value: days,
  };
}

export function setTravelTime(obj) {
  return {
    type: 'SET_TRAVEL_TIME',
    value: obj,
  };
}

export function setDarkMode(value) {
  return {
    type: 'SET_DARK_MODE',
    value: value,
  };
}
