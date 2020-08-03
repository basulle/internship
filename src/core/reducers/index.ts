import { combineReducers } from 'redux';
import * as signIn from './signIn';
import * as graph from './graph';
import * as buttons from './buttons';

export interface AppState {
  signInState: signIn.State;
  buttonsState: buttons.State;
  graphState: graph.State;
}

export const rootReducer = combineReducers<AppState>({
  signInState: signIn.reducer,
  buttonsState: buttons.reducer,
  graphState: graph.reducer,
});
