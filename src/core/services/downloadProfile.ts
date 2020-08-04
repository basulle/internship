import firebase from 'firebase';

export const downloadAvatar = (uid: string) => {
  return firebase.storage().ref().child('avatars').child(uid).getDownloadURL();
};

export const downloadProfile = (uid: string) => {
  return firebase.database().ref().child('users').child(uid).once('value');
};
