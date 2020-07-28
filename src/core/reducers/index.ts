import { combineReducers } from 'redux';
import * as signIn from './signIn';

export interface AppState {
  signInState: signIn.State;
}

export const rootReducer = combineReducers<AppState>({
  signInState: signIn.reducer,
});
