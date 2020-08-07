import { Dispatch } from 'redux';
import {
  avatarLoadAction,
  successAvatarLoadAction,
  errorAvatarLoadAction,
  profileLoadAction,
  successProfileLoadAction,
  errorProfileLoadAction,
  changeNameAction,
  successChangeNameAction,
  errorChangeNameAction,
  changeSecondNameAction,
  successChangeSecondNameAction,
  errorChangeSecondNameAction,
  changeAvatarAction,
  successChangeAvatarAction,
  errorChangeAvatarAction,
} from '../actions/profile';
import * as ProfileService from '../services/profile';

export function loadAvatar() {
  return (dispatch: Dispatch) => {
    dispatch(avatarLoadAction());
    ProfileService.loadAvatar()
      .then((url) => {
        dispatch(successAvatarLoadAction(url));
      })
      .catch((error) => {
        dispatch(errorAvatarLoadAction(error.message));
      });
  };
}

export function loadProfile() {
  return (dispatch: Dispatch) => {
    dispatch(profileLoadAction());
    ProfileService.loadProfile()
      .then((e) => {
        dispatch(successProfileLoadAction({ ...e.val() }));
      })
      .catch((error) => {
        dispatch(errorProfileLoadAction(error.message));
      });
  };
}

export function changeName(name: string) {
  return (dispatch: Dispatch) => {
    dispatch(changeNameAction());
    ProfileService.changeName(name)
      .then(() => {
        dispatch(successChangeNameAction());
      })
      .catch(() => dispatch(errorChangeNameAction()));
  };
}

export function changeSecondName(secondName: string) {
  return (dispatch: Dispatch) => {
    dispatch(changeSecondNameAction());
    ProfileService.changeSecondName(secondName)
      .then(() => {
        dispatch(successChangeSecondNameAction());
      })
      .catch(() => dispatch(errorChangeSecondNameAction()));
  };
}

export function uploadPhoto(image: string) {
  return (dispatch: Dispatch) => {
    dispatch(changeAvatarAction());
    ProfileService.uploadPhoto(image)
      .then(() => {
        dispatch(successChangeAvatarAction());
      })
      .catch(() => dispatch(errorChangeAvatarAction()));
  };
}
