import { BUTTON_STATE } from '../types/types';

export function buttonsAction(buttons: object) {
  return {
    type: BUTTON_STATE,
    payload: buttons,
  };
}
