import { AnyAction } from 'redux';
import { handleActions } from 'redux-actions';
import { GalleryActionTypes } from '../actions/gallery';
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
    [GalleryActionTypes.INIT_GALLERY]: (state: State) => ({
      ...state,
      isLoading: true,
    }),
    [GalleryActionTypes.SUCCESS_INIT_GALLERY]: (state: State, action: AnyAction) => ({
      ...state,
      graphs: { ...action.payload },
      isLoading: false,
    }),
    [GalleryActionTypes.ERROR_INIT_GALLERY]: (state: State) => ({
      ...state,
      isLoading: false,
    }),
  },
  initialState
);
