import firebase from 'firebase';

export const loadAvatar = (uid: string) => {
  return firebase.storage().ref().child('avatars').child(uid).getDownloadURL();
};

export const loadProfile = (uid: string) => {
  return firebase.database().ref().child('users').child(uid).once('value');
};

export const changeName = (name: string) => {
  firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).child('name').set(name);
};

export const changeSecondName = (secondName: string) => {
  firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).child('secondName').set(secondName);
};

export const uploadPhoto = async (image: string) => {
  const user = firebase.auth().currentUser;
  const response = await fetch(image);
  const blob = await response.blob();
  return firebase.storage().ref().child('avatars').child(user.uid).put(blob);
};
