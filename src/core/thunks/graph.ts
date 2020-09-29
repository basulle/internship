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
  AddtoGalleryGraphAction,
  successAddToGalleryGraphAction,
  errorAddToGalleryGraphAction,
} from '../actions/graph';
import { Point } from '../interfaces/point';
import { Line } from '../interfaces/line';

export function downloadGraphs() {
  return (dispatch: Dispatch) => {
    dispatch(initGraphAction());
    GraphService.downloadGraphs()
      .then((e) => {
        dispatch(successInitGraphAction({ ...e.val() }));
      })
      .catch(() => errorInitGraphAction());
  };
}

export function saveGraph(points: Point[], lines: Line[], id: string, graphName: string, graphUrl: string) {
  return (dispatch: Dispatch) => {
    dispatch(saveGraphAction());
    GraphService.saveGraph(points, lines, id, graphName, graphUrl).then(
      () => {
        dispatch(successSaveGraphAction());
      },
      (error) => {
        dispatch(errorSaveGraphAction(error));
      }
    );
  };
}

export function createGraph(points: Point[], lines: Line[], graphName: string, url: string) {
  return (dispatch: Dispatch) => {
    dispatch(createGraphAction());
    GraphService.createGraph(points, lines, graphName, url)
      .then((response) => {
        dispatch(successCreateGraphAction({ graph: { lines, points, graphName, url }, id: response.key }));
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

export function addToGallery(id: string) {
  return (dispatch: Dispatch) => {
    dispatch(AddtoGalleryGraphAction());
    GraphService.addToGallery(id).then(
      () => {
        dispatch(successAddToGalleryGraphAction());
      },
      (error) => {
        dispatch(errorAddToGalleryGraphAction());
      }
    );
  };
}
