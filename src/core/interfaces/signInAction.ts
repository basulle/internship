import { User } from './user';

export interface SignInAction {
  type: string;
  payload: User;
}
