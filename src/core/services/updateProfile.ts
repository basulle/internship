import firebase from 'firebase';

export const changeName = (name: string) => {
  firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).child('name').set(name);
};

export const changeSecondName = (secondName: string) => {
  firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).child('secondName').set(secondName);
};
