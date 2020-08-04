import firebase from 'firebase';

export const signOut = () => {
  return firebase.auth().signOut();
};

export const signIn = (email: string, password: string) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};
