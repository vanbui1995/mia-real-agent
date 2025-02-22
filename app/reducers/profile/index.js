import { fromJS } from 'immutable';

export const FETCH_DETAIL = 'profile/FETCH_DETAIL';
export const FETCH_DETAIL_SUCCESS = 'profile/FETCH_DETAIL_SUCCESS';
export const FETCH_DETAIL_FAIL = 'profile/FETCH_DETAIL_FAIL';

export const CHECK_PASSWORD = 'profile/CHECK_PASSWORD';
export const CHECK_PASSWORD_SUCCESS = 'profile/CHECK_PASSWORD_SUCCESS';
export const CHECK_PASSWORD_FAIL = 'profile/CHECK_PASSWORD_FAIL';

export const UPDATE_PROFILE = 'profile/UPDATE_PROFILE';
export const UPDATE_PROFILE_SUCCESS = 'profile/UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAIL = 'profile/UPDATE_PROFILE_FAIL';

export const CHANGE_PASSWORD = 'profile/CHANGE_PASSWORD';
export const CHANGE_PASSWORD_SUCCESS = 'profile/CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAIL = 'profile/CHANGE_PASSWORD_FAIL';

// action creator
const fetchDetailAction = () => ({
  type: FETCH_DETAIL,
});

// payload: {
//   username: { type: String },
//   email: { type: String },
//   role: { type: String },
//   profile: {
//     // profile for individual customer
//     firstName: { type: String },
//     lastName: { type: String },
//     position: { type: String }, // position in company
//     dateOfBirth: { type: Date },
//     // profile for business customer
//     companySize: { type: String }, // need to discuss
//     companyFields: [{ type: String }], // company working fields
//     // both
//     company: { type: String },
//     phone: { type: String },
//     address: { type: String },
//   }
// }
const fetchDetailCompleteAction = payload => ({
  type: FETCH_DETAIL_SUCCESS,
  payload,
});

const fetchDetailFailAction = errorMessage => ({
  type: FETCH_DETAIL_FAIL,
  payload: {
    errorMessage,
  },
});

const checkPasswordAction = password => ({
  type: CHECK_PASSWORD,
  payload: {
    password,
  },
});

const checkPasswordCompleteAction = confirmed => ({
  type: CHECK_PASSWORD_SUCCESS,
  payload: confirmed,
});
const checkPasswordFailAction = errorMessage => ({
  type: CHECK_PASSWORD_FAIL,
  payload: {
    errorMessage,
  },
});

const updateProfileAction = profile => ({
  type: UPDATE_PROFILE,
  payload: {
    profile,
  },
});

// payload: same as fetchDetailCompleteAction
const updateProfileCompleteAction = payload => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload,
});

const updateProfileFailAction = errorMessage => ({
  type: UPDATE_PROFILE_FAIL,
  payload: {
    errorMessage,
  },
});

const changePasswordAction = (currentPassword, newPassword) => ({
  type: CHANGE_PASSWORD,
  payload: {
    currentPassword, newPassword,
  },
});

// payload: same as fetchDetailCompleteAction
const changePasswordCompleteAction = () => ({
  type: CHANGE_PASSWORD_SUCCESS,
});

const changePasswordFailAction = errorMessage => ({
  type: CHANGE_PASSWORD_FAIL,
  errorMessage,
});


// selector
const getProfileIsFetching = ({ profile }) => profile.get('isFetching');
const getProfileFetchedProfile = ({ profile }) => profile.get('fetchUser');

const getProfilePasswordIsChecking = ({ profile }) => profile.get('isCheckingPassword');
const getProfilePasswordIsConfirmed = ({ profile }) => profile.get('checkPasswordConfirm');

const getProfileIsUpdating = ({ profile }) => profile.get('isUpdating');

const getProfilePasswordIsChanging = ({ profile }) => profile.get('isChangingPassword');
const getProfilePasswordChangeError = ({ profile }) => profile.get('changePasswordError');

const initialState = fromJS({
  isFetching: false,
  fetchError: '',
  fetchUser: {},

  isCheckingPassword: false,
  checkPasswordError: '',
  checkPasswordConfirm: false,

  isUpdating: false,
  updateError: '',

  isChangingPassword: false,
  changePasswordError: '',
});

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DETAIL:
      return state.set('isFetching', true)
        .set('fetchError', '')
        .set('fetchUser', {});
    case FETCH_DETAIL_SUCCESS:
      return state.set('isFetching', false)
        .set('fetchUser', action.payload);
    case FETCH_DETAIL_FAIL:
      return state.set('isFetching', false)
        .set('fetchError', action.errorMessage);

    case CHECK_PASSWORD:
      return state
        .set('isCheckingPassword', true)
        .set('checkPasswordError', '')
        .set('checkPasswordConfirm', false);
    case CHECK_PASSWORD_SUCCESS:
      return state
        .set('isCheckingPassword', false)
        .set('checkPasswordConfirm', action.payload);
    case CHECK_PASSWORD_FAIL:
      return state
        .set('isCheckingPassword', false)
        .set('checkPasswordError', action.errorMessage);

    case UPDATE_PROFILE:
      return state.set('isUpdating', true)
        .set('updateError', '');
    case UPDATE_PROFILE_SUCCESS:
      return state.set('isUpdating', false)
        .set('fetchUser', action.payload);
    case UPDATE_PROFILE_FAIL:
      return state.set('isUpdating', false)
        .set('updateError', action.errorMessage);

    case CHANGE_PASSWORD:
      return state.set('isChangingPassword', true)
        .set('changePasswordError', '');
    case CHANGE_PASSWORD_SUCCESS:
      return state.set('isChangingPassword', false);
    case CHANGE_PASSWORD_FAIL:
      return state.set('isChangingPassword', false)
        .set('changePasswordError', action.errorMessage);
    default: return state;
  }
}

export default profileReducer;

export const actions = {
  fetchDetailAction,
  fetchDetailCompleteAction,
  fetchDetailFailAction,

  checkPasswordAction,
  checkPasswordCompleteAction,
  checkPasswordFailAction,

  updateProfileAction,
  updateProfileCompleteAction,
  updateProfileFailAction,

  changePasswordAction,
  changePasswordCompleteAction,
  changePasswordFailAction,
};

export const selectors = {
  getProfileIsFetching,
  getProfileFetchedProfile,

  getProfilePasswordIsChecking,
  getProfilePasswordIsConfirmed,

  getProfileIsUpdating,

  getProfilePasswordIsChanging,
  getProfilePasswordChangeError,
};
