import { createSelector } from 'reselect';
import * as signIn from '../reducers/auth';
import { AppState } from '../reducers';

const signInState = (state: AppState): signIn.State => state.signInState;

export const selectSignInErrorState = createSelector(signInState, (state) => state.signInError);
export const selectRegisterErrorState = createSelector(signInState, (state) => state.registerError);
export const selectIsLoadingState = createSelector(signInState, (state) => state.isLoading);
