import { combineReducers } from 'redux';
import * as signIn from './signIn';
import * as graph from './graph';

export interface AppState {
  signInState: signIn.State;
  graphState: graph.State;
}

export const rootReducer = combineReducers<AppState>({
  signInState: signIn.reducer,
  graphState: graph.reducer,
});
