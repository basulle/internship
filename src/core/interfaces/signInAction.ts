export interface UserInterface {
  uid: string;
  email: string;
  name: string;
  secondName: string;
  birthday: string;
}

export interface SignInAction {
  type: string;
  payload: UserInterface;
}
