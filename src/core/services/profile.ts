import firebase from 'firebase';

export const loadAvatar = () => {
  const user = firebase.auth().currentUser;
  return firebase.storage().ref().child('avatars').child(user.uid).getDownloadURL();
};

export const loadProfile = () => {
  const user = firebase.auth().currentUser;
  return firebase.database().ref().child('users').child(user.uid).once('value');
};

export const changeName = (name: string) => {
  return firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).child('name').set(name);
};

export const changeSecondName = (secondName: string) => {
  return firebase
    .database()
    .ref()
    .child('users')
    .child(firebase.auth().currentUser.uid)
    .child('secondName')
    .set(secondName);
};

export const uploadPhoto = async (image: string) => {
  const user = firebase.auth().currentUser;
  const blob = await fetch(image).then((response) => response.blob());
  return firebase.storage().ref().child('avatars').child(user.uid).put(blob);
};
