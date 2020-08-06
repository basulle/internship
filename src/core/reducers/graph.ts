import { AnyAction } from 'redux';
import { INIT_GRAPH, SUCCESS_SAVE_GRAPH, SUCCESS_DELETE_GRAPH } from '../types/graph';
import { Graph } from '../interfaces/graph';

export interface State {
  graphs: {
    [id: string]: Graph;
  };
}

const initialState = {
  graphs: {},
};

export const reducer = (state: State = initialState, action: AnyAction): State => {
  switch (action.type) {
    case INIT_GRAPH:
      return {
        ...state,
        graphs: { ...action.payload },
      };
    case SUCCESS_SAVE_GRAPH:
      return {
        ...state,
        graphs: {
          ...state.graphs,
          [action.payload.id]: action.payload.graph,
        },
      };
    // case SUCCESS_DELETE_GRAPH:
    //   const nextState = { ...state };
    //   delete nextState.graphs[action.payload.id];
    //   return { ...nextState };
    case SUCCESS_DELETE_GRAPH:
      delete state.graphs[action.payload.id];
      return state;
    default:
      return state;
  }
};
