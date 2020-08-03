import { createSelector } from 'reselect';
import * as graph from '../reducers/graph';
import { AppState } from '../reducers';

const graphState = (state: AppState): graph.State => state.graphState;

export const graphs = createSelector(graphState, (state) => state.graphs);
