import firebase from 'firebase';
import { Point } from '../interfaces/point';
import { Line } from '../interfaces/line';

export const saveGraph = (points: Point[], lines: Line[], id: string) => {
  const user = firebase.auth().currentUser;
  const link = firebase.database().ref().child('users').child(user.uid).child('graphs');
  if (id.length > 3) {
    return link.child(id).set({
      points,
      lines,
    });
  }
  return link.push({
    points,
    lines,
  });
};
