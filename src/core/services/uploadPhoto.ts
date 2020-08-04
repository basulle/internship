import firebase from 'firebase';

export const uploadPhoto = async (image: string) => {
  const user = firebase.auth().currentUser;
  const response = await fetch(image);
  const blob = await response.blob();
  return firebase.storage().ref().child('avatars').child(user.uid).put(blob);
};
