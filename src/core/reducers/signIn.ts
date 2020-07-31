import { SIGNED_IN } from '../types/signIn';
import { SignInAction, UserInterface } from '../interfaces/signInAction';

export interface State {
  test: boolean;
  user: UserInterface;
}

const initialState = {
  test: false,
  user: {
    uid: '',
    email: '',
    name: '',
    secondName: '',
    birthday: '',
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
