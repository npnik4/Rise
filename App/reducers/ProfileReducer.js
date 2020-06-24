import {PURGE} from 'redux-persist';

const initialState = {
  profiles: [],
  selectedDays: [], // when adding this will be appended to new profile
  selectedProfile: null, // used to show which profile has been selected for edit
  disabledDays: [], // prevent same days in mutli profile
  transMode: '',
  travelTime: null,
};

const profile = (state = initialState, action) => {
  let allProfiles = null;
  let allDaysSelected = null;
  switch (action.type) {
    case 'SET_PROFILE_SELECTED':
      return {
        ...state,
        selectedProfile: action.value,
      };
    case 'ADD_PROFILE':
      allProfiles = Object.assign([], state.profiles);
      const disabledDays = Object.assign([], state.disabledDays);
      const newP = action.value;
      const targetDays = state.selectedDays;
      newP.SelectedDays = targetDays;
      targetDays.forEach((day) => {
        disabledDays.push(day);
      });
      allProfiles.push(newP);
      return Object.assign({}, state, {
        profiles: allProfiles,
        disabledDays: disabledDays,
      });

    case 'EDIT_PROFILE':
      const newProfile = action.value.profile;
      allProfiles = Object.assign([], state.profiles);
      const index = state.selectedProfile;
      // compare selected days to disabled days
      const disabled = Object.assign([], state.disabledDays);
      const selectedDays = action.value.selectedDays;
      const originalDays = action.value.originalDays;
      if (selectedDays.length > originalDays.length) {
        selectedDays.forEach((day) => {
          if (!originalDays.includes(day)) {
            disabled.push(day);
          }
        });
      } else {
        originalDays.forEach((day) => {
          if (!selectedDays.includes(day)) {
            const i = disabled.indexOf(day);
            disabled.splice(i, 1);
          }
        });
      }
      // remove from disabled days if needed
      newProfile.SelectedDays = selectedDays;
      if (allProfiles && index != null) {
        allProfiles[index] = newProfile;
      }
      return Object.assign({}, state, {
        profiles: allProfiles,
        selectedProfile: null,
        disabledDays: disabled,
      });
    case 'DELETE_PROFILE':
      const disabledDay = Object.assign([], state.disabledDays);
      allProfiles = Object.assign([], state.profiles);
      const selectProfile = state.selectedProfile;
      const originalDay = action.value;
      originalDay.forEach((day) => {
        if (disabledDay.includes(day)) {
          const i = disabledDay.indexOf(day);
          disabledDay.splice(i, 1);
        }
      });
      if (allProfiles && selectProfile != null) {
        allProfiles.splice(selectProfile, 1);
      }
      return Object.assign({}, state, {
        profiles: allProfiles,
        selectedProfile: null,
        disabledDays: disabledDay,
      });
    case 'SET_SELECTED_DAYS':
      allDaysSelected = Object.assign([], state.selectedDays);
      const newDay = action.value;
      if (allDaysSelected.includes(newDay)) {
        const i = allDaysSelected.indexOf(newDay);
        allDaysSelected.splice(i, 1);
      } else {
        allDaysSelected.push(newDay);
      }
      return Object.assign({}, state, {
        selectedDays: allDaysSelected,
      });
    case 'SET_TRANS_MODE':
      if (state.transMode === action.value) {
        return {
          ...state,
          transMode: '',
        };
      } else {
        return {
          ...state,
          transMode: action.value,
        };
      }
    case 'CLEAR_DAYS':
      return {
        ...state,
        selectedDays: [],
      };
    case 'SET_TRAVEL_TIME':
      return {
        ...state,
        travelTime: action.value,
      };
    case PURGE:
      console.log('Purge profile');
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default profile;
