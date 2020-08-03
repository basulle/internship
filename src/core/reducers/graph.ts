import { GRAPH_INIT } from '../types/types';
import { Graph } from '../interfaces/graph';

export interface State {
  graphs: {
    [id: string]: Graph;
  };
}

const initialState = {
  graphs: {},
};

export const reducer = (state: State = initialState, action: any): State => {
  switch (action.type) {
    case GRAPH_INIT:
      return {
        ...state,
        graphs: { ...action.payload },
      };
    case 'SUCCESS_GRAPH':
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
