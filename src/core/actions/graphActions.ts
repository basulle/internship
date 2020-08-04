import { INIT_GRAPH, SUCCESS_SAVE_GRAPH, SAVE_GRAPH, ERROR_SAVE_GRAPH } from '../types/graph';
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
