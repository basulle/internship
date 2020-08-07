import { combineReducers } from 'redux';
import * as signIn from './auth';
import * as graph from './graph';
import * as profile from './profile';

export interface AppState {
  signInState: signIn.State;
  graphState: graph.State;
  profileState: profile.State;
}

export const rootReducer = combineReducers<AppState>({
  signInState: signIn.reducer,
  graphState: graph.reducer,
  profileState: profile.reducer,
});
