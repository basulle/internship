import { SIGNED_IN } from '../types/types';
import { SignInAction } from '../interfaces/signInAction';
import { User } from '../interfaces/user';

export interface State {
  test: boolean;
  user: User;
}

const initialState = {
  test: false,
  user: {
    uid: '',
    email: '',
    name: '',
    secondName: '',
    birthday: '',
    url: '',
  },
};

export const reducer = (state: State = initialState, action: SignInAction): State => {
  switch (action.type) {
    case SIGNED_IN:
      return {
        ...state,
        test: true,
        user: { ...action.payload },
      };
    default:
      return state;
  }
};
