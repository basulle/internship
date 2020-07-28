import { SIGNED_IN } from '../types/signIn';
import { SignInAction } from '../interfaces/signInAction';

export interface State {
  test: boolean;
  payload: string;
}

const initialState = {
  test: false,
  payload: '',
};

export const reducer = (state: State = initialState, action: SignInAction): State => {
  switch (action.type) {
    case SIGNED_IN:
      return {
        ...state,
        test: true,
        payload: action.payload,
      };
    default:
      return state;
  }
};
