import { createAction } from 'redux-actions';

export enum ProfileActionTypes {
  PROFILE_LOAD = '[Profile] PROFILE_LOAD',
  SUCCESS_PROFILE_LOAD = '[Profile] SUCCESS_PROFILE_LOAD',
  ERROR_PROFILE_LOAD = '[Profile] ERROR_PROFILE_LOAD',

  AVATAR_LOAD = '[Profile] AVATAR_LOAD',
  SUCCESS_AVATAR_LOAD = '[Profile] SUCCESS_AVATAR_LOAD',
  ERROR_AVATAR_LOAD = '[Profile] ERROR_AVATAR_LOAD',

  CHANGE_NAME = '[Profile] CHANGE_NAME',
  SUCCESS_CHANGE_NAME = '[Profile] SUCCESS_CHANGE_NAME',
  ERROR_CHANGE_NAME = '[Profile] ERROR_CHANGE_NAME',

  CHANGE_SECONDNAME = '[Profile] CHANGE_SECONDNAME',
  SUCCESS_CHANGE_SECONDNAME = '[Profile] SUCCESS_CHANGE_SECONDNAME',
  ERROR_CHANGE_SECONDNAME = '[Profile] ERROR_CHANGE_SECONDNAME',

  CHANGE_AVATAR = '[Profile] CHANGE_AVATAR',
  SUCCESS_CHANGE_AVATAR = '[Profile] SUCCESS_CHANGE_AVATAR',
  ERROR_CHANGE_AVATAR = '[Profile] ERROR_CHANGE_AVATAR',
}
export const profileLoadAction = createAction(ProfileActionTypes.PROFILE_LOAD);
export const successProfileLoadAction = createAction(
  ProfileActionTypes.SUCCESS_PROFILE_LOAD,
  (payload: { user: object }) => payload
);
export const errorProfileLoadAction = createAction(ProfileActionTypes.ERROR_PROFILE_LOAD);
export const avatarLoadAction = createAction(ProfileActionTypes.AVATAR_LOAD);
export const successAvatarLoadAction = createAction(
  ProfileActionTypes.SUCCESS_AVATAR_LOAD,
  (payload: { url: string }) => payload
);
export const errorAvatarLoadAction = createAction(
  ProfileActionTypes.ERROR_AVATAR_LOAD,
  (payload: { url: '' }) => payload
);

export const changeNameAction = createAction(ProfileActionTypes.CHANGE_NAME);
export const successChangeNameAction = createAction(ProfileActionTypes.SUCCESS_CHANGE_NAME);
export const errorChangeNameAction = createAction(ProfileActionTypes.ERROR_CHANGE_NAME);

export const changeSecondNameAction = createAction(ProfileActionTypes.CHANGE_SECONDNAME);
export const successChangeSecondNameAction = createAction(ProfileActionTypes.SUCCESS_CHANGE_SECONDNAME);
export const errorChangeSecondNameAction = createAction(ProfileActionTypes.ERROR_CHANGE_SECONDNAME);

export const changeAvatarAction = createAction(ProfileActionTypes.CHANGE_AVATAR);
export const successChangeAvatarAction = createAction(ProfileActionTypes.SUCCESS_CHANGE_AVATAR);
export const errorChangeAvatarAction = createAction(ProfileActionTypes.ERROR_CHANGE_AVATAR);
