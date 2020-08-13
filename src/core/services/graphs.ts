import firebase from 'firebase';
import { Point } from '../interfaces/point';
import { Line } from '../interfaces/line';

export const saveGraph = (points: Point[], lines: Line[], id: string) => {
  const user = firebase.auth().currentUser;
  return firebase.database().ref().child('users').child(user.uid).child('graphs').child(id).set({
    points,
    lines,
  });
};

export const createGraph = async (points: Point[], lines: Line[], graphName: string, graphUrl: string) => {
  const user = firebase.auth().currentUser;
  const storage = firebase.storage().ref().child('graphs');
  const database = firebase.database().ref().child('users').child(user.uid).child('graphs');
  const response = await fetch(graphUrl);
  const blob = await response.blob();
  return database
    .push({
      points,
      lines,
      graphName,
      url: '',
    })
    .then((resp) =>
      storage
        .child(resp.key)
        .put(blob)
        .then(() =>
          storage
            .child(resp.key)
            .getDownloadURL()
            .then((url) =>
              database
                .child(resp.key)
                .child('url')
                .set(url)
                .then(() => resp)
            )
        )
    );
};

export const downloadGraphs = () => {
  const user = firebase.auth().currentUser;
  return firebase.database().ref().child('users').child(user.uid).child('graphs').once('value');
};

export const deleteGraph = (id: string) => {
  const user = firebase.auth().currentUser;
  return firebase.database().ref().child('users').child(user.uid).child('graphs').child(id).remove();
};

export const addToGallery = (id: string) => {
  const user = firebase.auth().currentUser;
  return firebase
    .database()
    .ref()
    .child('users')
    .child(user.uid)
    .child('graphs')
    .child(id)
    .once('value', (e) => {
      firebase.database().ref().child('gallery').child(id).set(e.val());
    });
};
