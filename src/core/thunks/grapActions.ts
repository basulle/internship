import { Dispatch } from 'redux';
// import { useDispatch } from 'react-redux';
import * as GraphService from '../services/graphs';
import { graphInitAction, graphSaveAction, graphFailedAction, graphSuccessAction } from '../actions/graphActions';
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
        // console.log(response);
        dispatch(graphSuccessAction(id, { lines, points }));
      },
      (error) => {
        dispatch(graphFailedAction(error));
      }
    );
  };
}
