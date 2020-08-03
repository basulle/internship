import { BUTTON_STATE } from '../types/types';

export interface State {
  move: boolean;
  draw: boolean;
  deleteCircle: boolean;
  connectCircles: boolean;
}

const initialState = {
  move: true,
  draw: false,
  deleteCircle: false,
  connectCircles: false,
};

interface ButtonsState {
  type: string;
  payload: State;
}

export const reducer = (state: State = initialState, action: ButtonsState): State => {
  switch (action.type) {
    case BUTTON_STATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
