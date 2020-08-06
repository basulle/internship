import {
  INIT_GRAPH,
  SUCCESS_SAVE_GRAPH,
  SAVE_GRAPH,
  ERROR_SAVE_GRAPH,
  DELETE_GRAPH,
  SUCCESS_DELETE_GRAPH,
  ERROR_DELETE_GRAPH,
} from '../types/graph';
import { Graph } from '../interfaces/graph';

export function graphInitAction(graphs: object) {
  return {
    type: INIT_GRAPH,
    payload: graphs,
  };
}

export function graphSaveAction() {
  return {
    type: SAVE_GRAPH,
  };
}

export function graphSuccessAction(id: string, graph: Graph) {
  return {
    type: SUCCESS_SAVE_GRAPH,
    payload: { graph, id },
  };
}

export function graphFailedAction(error: object) {
  return {
    type: ERROR_SAVE_GRAPH,
    payload: error,
  };
}

export function graphDeleteAction() {
  return {
    type: DELETE_GRAPH,
  };
}

export function graphDeleteSuccessAction(id: string) {
  return {
    type: SUCCESS_DELETE_GRAPH,
    payload: { id },
  };
}

export function graphDeleteFailedAction() {
  return {
    type: ERROR_DELETE_GRAPH,
  };
}
