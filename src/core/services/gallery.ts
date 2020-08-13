import firebase from 'firebase';

export const downloadGallery = () => {
  return firebase.database().ref().child('gallery').once('value');
};
