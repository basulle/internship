import { handleActions } from 'redux-actions';
import { AnyAction } from 'redux';
import { User } from '../interfaces/user';
import { ProfileActionTypes } from '../actions/profile';

export interface State {
  uploaded: boolean;
  isLoading: boolean;
  avatarUrl: string;
  errorAvatar: string;
  errorProfile: string;
  user: User;
}

const initialState = {
  uploaded: false,
  isLoading: false,
  avatarUrl: '',
  errorAvatar: '',
  errorProfile: '',
  user: {
    email: '',
    name: '',
    secondName: '',
    birthday: '',
  },
};

export const reducer = handleActions<State>(
  {
    [ProfileActionTypes.AVATAR_LOAD]: (state: State) => ({
      ...state,
      isLoading: true,
    }),
    [ProfileActionTypes.SUCCESS_AVATAR_LOAD]: (state: State, action: AnyAction) => ({
      ...state,
      avatarUrl: action.payload,
      errorAvatar: '',
      isLoading: false,
    }),
    [ProfileActionTypes.ERROR_AVATAR_LOAD]: (state: State, action: AnyAction) => ({
      ...state,
      errorAvatar: action.payload,
      isLoading: false,
    }),
    [ProfileActionTypes.PROFILE_LOAD]: (state: State) => ({
      ...state,
      isLoading: true,
    }),
    [ProfileActionTypes.SUCCESS_PROFILE_LOAD]: (state: State, action: AnyAction) => ({
      ...state,
      uploaded: true,
      errorProfile: '',
      user: { ...action.payload },
      isLoading: false,
    }),
    [ProfileActionTypes.ERROR_PROFILE_LOAD]: (state: State, action: AnyAction) => ({
      ...state,
      errorProfile: action.payload,
      isLoading: false,
    }),
  },
  initialState
);
