import { createSelector } from 'reselect';
import * as profile from '../reducers/profile';
import { AppState } from '../reducers';

const profileState = (state: AppState): profile.State => state.profileState;

export const selectProfileState = createSelector(profileState, (state) => state);
