import { Dispatch } from 'redux';
import * as AuthService from '../services/auth';
import {
  signingInAction,
  successSignInAction,
  errorSignInAction,
  registerAction,
  successRegisterAction,
  errorRegisterAction,
  signingOutAction,
  successSignOutAction,
  errorSignOutAction,
} from '../actions/auth';

// TODO: find type for history or antoher logic for navigate programatically
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function signIn(email: string, password: string, history: any) {
  return (dispatch: Dispatch) => {
    dispatch(signingInAction());
    AuthService.signIn(email, password)
      .then(() => {
        dispatch(successSignInAction());
        history.push('/');
      })
      .catch((error) => {
        dispatch(errorSignInAction(error.message));
      });
  };
}

export function register(
  email: string,
  password: string,
  name: string,
  secondName: string,
  birthday: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  history: any
) {
  return (dispatch: Dispatch) => {
    dispatch(registerAction());
    AuthService.register(email, password, name, secondName, birthday)
      .then(() => {
        dispatch(successRegisterAction());
        history.push('/');
      })
      .catch((error) => {
        dispatch(errorRegisterAction(error.message));
      });
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function signOut(history: any) {
  return (dispatch: Dispatch) => {
    dispatch(signingOutAction());
    AuthService.signOut()
      .then(() => {
        dispatch(successSignOutAction());
        history.push('/');
      })
      .catch((error) => dispatch(errorSignOutAction(error.message)));
  };
}
