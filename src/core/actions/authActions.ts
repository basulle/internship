import {
  SUCCESS_SIGN_IN,
  SIGNING_IN,
  ERROR_AVATAR,
  SUCCESS_PROFILE_LOADED,
  ERROR_SIGN_IN,
  SUCCESS_REGISTER,
  ERROR_REGISTER,
  REGISTER,
} from '../types/auth';

export function profileSuccessAction(user: object) {
  return {
    type: SUCCESS_PROFILE_LOADED,
    payload: user,
  };
}

export function avatarErrorAction() {
  return {
    type: ERROR_AVATAR,
  };
}

export function signingIn() {
  return {
    type: SIGNING_IN,
  };
}

export function signInError() {
  return {
    type: ERROR_SIGN_IN,
  };
}

export function signInSuccess() {
  return {
    type: SUCCESS_SIGN_IN,
  };
}

export function register() {
  return {
    type: REGISTER,
  };
}

export function registerError() {
  return {
    type: ERROR_REGISTER,
  };
}

export function registerSuccess() {
  return {
    type: SUCCESS_REGISTER,
  };
}
