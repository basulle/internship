import { Dispatch } from 'redux';
import * as GraphService from '../services/graphs';
import {
  initGraphAction,
  successInitGraphAction,
  errorInitGraphAction,
  saveGraphAction,
  successSaveGraphAction,
  errorSaveGraphAction,
  deleteGraphAction,
  successDeleteGraphAction,
  errorDeleteGraphAction,
  createGraphAction,
  successCreateGraphAction,
  errorCreateGraphAction,
} from '../actions/graph';
import { Point } from '../interfaces/point';
import { Line } from '../interfaces/line';

export function downloadGraphs(uid: string) {
  return (dispatch: Dispatch) => {
    dispatch(initGraphAction());
    GraphService.downloadGraphs(uid)
      .then((e) => {
        dispatch(successInitGraphAction({ ...e.val() }));
      })
      .catch(() => errorInitGraphAction());
  };
}

export function saveGraph(points: Point[], lines: Line[], id: string) {
  return (dispatch: Dispatch) => {
    dispatch(saveGraphAction());
    GraphService.saveGraph(points, lines, id).then(
      () => {
        dispatch(successSaveGraphAction());
      },
      (error) => {
        dispatch(errorSaveGraphAction(error));
      }
    );
  };
}

export function createGraph(points: Point[], lines: Line[]) {
  return (dispatch: Dispatch) => {
    dispatch(createGraphAction());
    GraphService.createGraph(points, lines)
      .then((response) => {
        dispatch(successCreateGraphAction({ graph: { lines, points }, id: response.key }));
      })
      .catch(() => errorCreateGraphAction());
  };
}

export function deleteGraph(id: string) {
  return (dispatch: Dispatch) => {
    dispatch(deleteGraphAction());
    GraphService.deleteGraph(id).then(
      () => {
        dispatch(successDeleteGraphAction({ id }));
      },
      (error) => {
        dispatch(errorDeleteGraphAction());
      }
    );
  };
}
