import { Dispatch } from 'redux';
import * as GraphService from '../services/graphs';
import {
  graphInitAction,
  graphSaveAction,
  graphFailedAction,
  graphSuccessAction,
  graphDeleteAction,
  graphDeleteSuccessAction,
  graphDeleteFailedAction,
} from '../actions/graphActions';
import { Point } from '../interfaces/point';
import { Line } from '../interfaces/line';

export function downloadGraphs(uid: string) {
  return (dispatch: Dispatch) => {
    GraphService.downloadGraphs(uid).then((e) => {
      dispatch(graphInitAction({ ...e.val() }));
    });
  };
}

export function saveGraph(points: Point[], lines: Line[], id: string) {
  return (dispatch: Dispatch) => {
    dispatch(graphSaveAction());
    GraphService.saveGraph(points, lines, id).then(
      (response) => {
        if (response) {
          dispatch(graphSuccessAction(response.path.pieces_[3], { lines, points }));
        }
      },
      (error) => {
        dispatch(graphFailedAction(error));
      }
    );
  };
}

export function deleteGraph(id: string) {
  return (dispatch: Dispatch) => {
    dispatch(graphDeleteAction());
    GraphService.deleteGraph(id).then(
      () => {
        dispatch(graphDeleteSuccessAction(id));
      },
      (error) => {
        dispatch(graphDeleteFailedAction());
      }
    );
  };
}
