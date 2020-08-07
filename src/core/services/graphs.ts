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

export const createGraph = (points: Point[], lines: Line[]) => {
  const user = firebase.auth().currentUser;
  return firebase.database().ref().child('users').child(user.uid).child('graphs').push({
    points,
    lines,
  });
};

export const downloadGraphs = (uid: string) => {
  return firebase.database().ref().child('users').child(uid).child('graphs').once('value');
};

export const deleteGraph = (id: string) => {
  const user = firebase.auth().currentUser;
  return firebase.database().ref().child('users').child(user.uid).child('graphs').child(id).remove();
};
