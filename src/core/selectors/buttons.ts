import { createSelector } from 'reselect';
import * as buttons from '../reducers/buttons';
import { AppState } from '../reducers';

const bState = (state: AppState): buttons.State => state.buttonsState;
export const buttonsState = createSelector(bState, (state) => state);
