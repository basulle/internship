import { Dispatch } from 'redux';
import firebase from 'firebase';
import { GRAPH_INIT } from '../types/types';
import { Graph } from '../interfaces/graph';
import { Point } from '../interfaces/point';
import { Line } from '../interfaces/line';
import * as GraphService from '../services/graphs';

export function graphInitAction(graphs: object) {
  return {
    type: GRAPH_INIT,
    payload: graphs,
  };
}

export function graphSaveAction() {
  return {
    type: 'SAVE_GRAPH',
  };
}

export function graphSuccessAction(id: string, graph: Graph) {
  return {
    type: 'SUCCESS_GRAPH',
    payload: { graph, id },
  };
}

export function graphFailedAction(error: object) {
  return {
    type: 'ERROR_GRAPH',
    payload: error,
  };
}

export function downloadGraphs(uid: string) {
  return (dispatch: Dispatch) => {
    firebase
      .database()
      .ref()
      .child('users')
      .child(uid)
      .child('graphs')
      .on('value', (e) => {
        dispatch(graphInitAction({ ...e.val() }));
      });
  };
}

export function saveGraph(points: Point[], lines: Line[], id: string) {
  return (dispatch: Dispatch) => {
    dispatch(graphSaveAction());
    GraphService.saveGraph(points, lines, id).then(
      (response) => {
        // console.log(response);
        // dispatch(graphSuccessAction(response.key, { lines, points }));
      },
      (error) => {
        dispatch(graphFailedAction(error));
      }
    );
  };
}
