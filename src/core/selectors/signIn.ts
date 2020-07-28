import { createSelector } from 'reselect';
import * as signIn from '../reducers/signIn';
import { AppState } from '../reducers';

const signInState = (state: AppState): signIn.State => state.signInState;

export const testState = createSelector(signInState, (state) => state);
