import { SIGNED_IN } from '../types/signIn';

export function signInAction(user: string) {
  return {
    type: SIGNED_IN,
    payload: user,
  };
}
