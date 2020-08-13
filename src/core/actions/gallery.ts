import { createAction } from 'redux-actions';
import { Graph } from '../interfaces/graph';

export enum GalleryActionTypes {
  INIT_GALLERY = '[Gallery] INIT_GALLERY',
  SUCCESS_INIT_GALLERY = '[Gallery] SUCCESS_INIT_GALLERY',
  ERROR_INIT_GALLERY = '[Gallery] ERROR_INIT_GALLERY',
}

export const initGalleryAction = createAction(GalleryActionTypes.INIT_GALLERY);
export const successInitGalleryAction = createAction(
  GalleryActionTypes.SUCCESS_INIT_GALLERY,
  (payload: { graphs: Graph }) => payload
);
export const errorInitGalleryAction = createAction(GalleryActionTypes.ERROR_INIT_GALLERY);
