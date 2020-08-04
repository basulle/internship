import { Dispatch } from 'redux';
import { avatarErrorAction, profileSuccessAction } from '../actions/authActions';
import * as downloadProfile from '../services/downloadProfile';

export function uploadUserProfile(uid: string) {
  return (dispatch: Dispatch) => {
    let url: string;
    downloadProfile
      .downloadAvatar(uid)
      .then((URL) => {
        url = URL;
      })
      .catch(() => {
        url = '';
        dispatch(avatarErrorAction());
      })
      .then(() => {
        downloadProfile.downloadProfile(uid).then((e) => {
          dispatch(profileSuccessAction({ ...e.val(), uid, url }));
        });
      });
  };
}
