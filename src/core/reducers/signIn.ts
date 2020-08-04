import { AnyAction } from 'redux';
import { SIGNING_IN, ERROR_AVATAR, SUCCESS_PROFILE_LOADED } from '../types/auth';
import { User } from '../interfaces/user';

export interface State {
  uploaded: boolean;
  user: User;
}

const initialState = {
  uploaded: false,
  user: {
    uid: '',
    email: '',
    name: '',
    secondName: '',
    birthday: '',
    url: '',
  },
};

export const reducer = (state: State = initialState, action: AnyAction): State => {
  switch (action.type) {
    case SIGNING_IN:
      return {
        ...state,
      };
    case SUCCESS_PROFILE_LOADED:
      return {
        ...state,
        uploaded: true,
        user: { ...action.payload },
      };
    case ERROR_AVATAR:
      return {
        ...state,
      };
    default:
      return state;
  }
};
