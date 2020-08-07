import { createAction } from 'redux-actions';
import { Graph } from '../interfaces/graph';

export enum GraphActionTypes {
  INIT_GRAPH = '[Graph] INIT_GRAPH',
  SUCCESS_INIT_GRAPH = '[Graph] SUCCESS_INIT_GRAPH',
  ERROR_INIT_GRAPH = '[Graph] ERROR_INIT_GRAPH',

  SAVE_GRAPH = '[Graph] SAVE_GRAPH',
  SUCCESS_SAVE_GRAPH = '[Graph] SUCCESS_SAVE_GRAPH',
  ERROR_SAVE_GRAPH = '[Graph] ERROR_SAVE_GRAPH',

  CREATE_GRAPH = '[Graph] CREATE_GRAPH',
  SUCCESS_CREATE_GRAPH = '[Graph] SUCCESS_CREATE_GRAPH',
  ERROR_CREATE_GRAPH = '[Graph] ERROR_CREATE_GRAPH',

  DELETE_GRAPH = '[Graph] DELETE_GRAPH',
  SUCCESS_DELETE_GRAPH = '[Graph] SUCCESS_DELETE_GRAPH',
  ERROR_DELETE_GRAPH = '[Graph] ERROR_DELETE_GRAPH',
}

export const initGraphAction = createAction(GraphActionTypes.INIT_GRAPH);
export const successInitGraphAction = createAction(
  GraphActionTypes.SUCCESS_INIT_GRAPH,
  (payload: { graphs: object }) => payload
);
export const errorInitGraphAction = createAction(GraphActionTypes.ERROR_INIT_GRAPH);
export const saveGraphAction = createAction(GraphActionTypes.SAVE_GRAPH);
export const successSaveGraphAction = createAction(GraphActionTypes.SUCCESS_SAVE_GRAPH);
export const errorSaveGraphAction = createAction(
  GraphActionTypes.ERROR_SAVE_GRAPH,
  (payload: { error: object }) => payload
);
export const createGraphAction = createAction(GraphActionTypes.CREATE_GRAPH);
export const successCreateGraphAction = createAction(
  GraphActionTypes.SUCCESS_CREATE_GRAPH,
  (payload: { graph: Graph; id: string }) => payload
);
export const errorCreateGraphAction = createAction(GraphActionTypes.ERROR_CREATE_GRAPH);
export const deleteGraphAction = createAction(GraphActionTypes.DELETE_GRAPH);
export const successDeleteGraphAction = createAction(
  GraphActionTypes.SUCCESS_DELETE_GRAPH,
  (payload: { id: string }) => payload
);
export const errorDeleteGraphAction = createAction(GraphActionTypes.ERROR_DELETE_GRAPH);
