import { Dispatch } from 'redux';
import firebase from 'firebase';
import { SIGNED_IN } from '../types/types';

export function signInAction(user: object) {
  return {
    type: SIGNED_IN,
    payload: user,
  };
}

export function thunkTest(uid: string) {
  return (dispatch: Dispatch) => {
    let url: string;
    firebase
      .storage()
      .ref()
      .child('avatars')
      .child(uid)
      .getDownloadURL()
      .then((URL) => {
        url = URL;
      });
    firebase
      .database()
      .ref()
      .child('users')
      .child(uid)
      .on('value', (e) => {
        dispatch(signInAction({ ...e.val(), uid, url }));
      });
  };
}
