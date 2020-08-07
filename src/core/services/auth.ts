import firebase from 'firebase';

export const signOut = () => {
  return firebase.auth().signOut();
};

export const signIn = (email: string, password: string) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const register = (email: string, password: string, name: string, secondName: string, birthday: string) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      firebase.database().ref().child('users').child(res.user.uid).set({ email, name, secondName, birthday });
    });
};
