import { Dispatch } from 'redux';
import { avatarErrorAction, profileSuccessAction } from '../actions/authActions';
import { loadAvatar, loadProfile } from '../services/profile';

export function uploadUserProfile(uid: string) {
  return (dispatch: Dispatch) => {
    let url: string;
    loadAvatar(uid)
      .then((URL) => {
        url = URL;
      })
      .catch(() => {
        url = '';
        dispatch(avatarErrorAction());
      })
      .then(() => {
        loadProfile(uid).then((e) => {
          dispatch(profileSuccessAction({ ...e.val(), uid, url }));
        });
      });
  };
}

// export function register(email: string, password: string, name: string, secondName: string, birthday: string) {
//   return (dispatch: Dispatch) => {
//     dispatch(registerAction());
//     registerService
//       .register(email, password, name, secondName, birthday)
//       .then(() => {
//         dispatch(registerSuccess());
//       })
//       .catch(() => dispatch(registerError()));
//   };
// }
