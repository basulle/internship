import { createAction } from 'redux-actions';

export enum AuthActionTypes {
  SIGNING_IN = '[Auth] SIGNING_IN',
  SUCCESS_SIGN_IN = '[Auth] SUCCESS_SIGN_IN',
  ERROR_SIGN_IN = '[Auth] ERROR_SIGN_IN',

  REGISTER = '[Auth] REGISTER',
  SUCCESS_REGISTER = '[Auth] SUCCESS_REGISTER',
  ERROR_REGISTER = '[Auth] ERROR_REGISTER',

  SIGNING_OUT = '[Auth] SIGNING_OUT',
  SUCCESS_SIGN_OUT = '[Auth] SUCCESS_SIGN_OUT',
  ERROR_SIGN_OUT = '[Auth] ERROR_SIGN_OUT',
}

export const signingInAction = createAction(AuthActionTypes.SIGNING_IN);
export const successSignInAction = createAction(AuthActionTypes.SUCCESS_SIGN_IN);
export const errorSignInAction = createAction(AuthActionTypes.ERROR_SIGN_IN, (payload: { error: string }) => payload);
export const registerAction = createAction(AuthActionTypes.REGISTER);
export const successRegisterAction = createAction(AuthActionTypes.SUCCESS_REGISTER);
export const errorRegisterAction = createAction(
  AuthActionTypes.ERROR_REGISTER,
  (payload: { error: string }) => payload
);
export const signingOutAction = createAction(AuthActionTypes.SIGNING_OUT);
export const successSignOutAction = createAction(AuthActionTypes.SUCCESS_SIGN_OUT);
export const errorSignOutAction = createAction(AuthActionTypes.ERROR_SIGN_OUT, (payload: { error: string }) => payload);
