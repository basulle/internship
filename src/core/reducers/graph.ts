import { AnyAction } from 'redux';
import { handleActions } from 'redux-actions';
import { GraphActionTypes } from '../actions/graph';
import { Graph } from '../interfaces/graph';

export interface State {
  graphs: {
    [id: string]: Graph;
  };
  isLoading: boolean;
}

const initialState = {
  graphs: {},
  isLoading: false,
};

export const reducer = handleActions<State>(
  {
    [GraphActionTypes.INIT_GRAPH]: (state: State) => ({
      ...state,
      isLoading: true,
    }),
    [GraphActionTypes.SUCCESS_INIT_GRAPH]: (state: State, action: AnyAction) => ({
      ...state,
      graphs: { ...action.payload },
      isLoading: false,
    }),
    [GraphActionTypes.ERROR_INIT_GRAPH]: (state: State) => ({
      ...state,
      isLoading: false,
    }),
    [GraphActionTypes.SAVE_GRAPH]: (state: State) => ({
      ...state,
      isLoading: true,
    }),
    [GraphActionTypes.SUCCESS_SAVE_GRAPH]: (state: State, action: AnyAction) => ({
      ...state,
      isLoading: false,
    }),
    [GraphActionTypes.ERROR_SAVE_GRAPH]: (state: State) => ({
      ...state,
      isLoading: false,
    }),
    [GraphActionTypes.CREATE_GRAPH]: (state: State) => ({
      ...state,
      isLoading: true,
    }),
    [GraphActionTypes.SUCCESS_CREATE_GRAPH]: (state: State, action: AnyAction) => ({
      ...state,
      graphs: {
        ...state.graphs,
        [action.payload.id]: action.payload.graph,
      },
      isLoading: false,
    }),
    [GraphActionTypes.ERROR_CREATE_GRAPH]: (state: State) => ({
      ...state,
      isLoading: false,
    }),
    [GraphActionTypes.DELETE_GRAPH]: (state: State) => ({
      ...state,
      isLoading: true,
    }),
    [GraphActionTypes.SUCCESS_DELETE_GRAPH]: (state: State, action: AnyAction) => {
      const nextState = { ...state };
      delete nextState.graphs[action.payload.id];
      return { ...nextState, isLoading: false };
    },
    [GraphActionTypes.ERROR_DELETE_GRAPH]: (state: State) => ({
      ...state,
      isLoading: false,
    }),
  },
  initialState
);
