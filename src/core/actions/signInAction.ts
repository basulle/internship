import { Dispatch } from 'redux';
import firebase from 'firebase';
import { SIGNED_IN } from '../types/signIn';

export function signInAction(user: object) {
  return {
    type: SIGNED_IN,
    payload: user,
  };
}

export function thunkTest(uid: string) {
  return (dispatch: Dispatch) => {
    firebase
      .database()
      .ref()
      .child('users')
      .child(uid)
      .on('value', (e) => {
        dispatch(signInAction({ ...e.val(), uid }));
      });
  };
}
