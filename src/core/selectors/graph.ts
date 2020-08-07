import { createSelector } from 'reselect';
import * as graph from '../reducers/graph';
import { AppState } from '../reducers';

const graphState = (state: AppState): graph.State => state.graphState;

export const selectGraphsState = createSelector(graphState, (state) => state.graphs);
export const selectIsLoadingState = createSelector(graphState, (state) => state.isLoading);
