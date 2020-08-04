import { AnyAction } from 'redux';
import { INIT_GRAPH, SUCCESS_SAVE_GRAPH } from '../types/graph';
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
    default:
      return state;
  }
};
