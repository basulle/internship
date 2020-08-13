import { Dispatch } from 'redux';
import * as GalleryService from '../services/gallery';
import { initGalleryAction, successInitGalleryAction, errorInitGalleryAction } from '../actions/gallery';

export function downloadGallery() {
  return (dispatch: Dispatch) => {
    dispatch(initGalleryAction());
    GalleryService.downloadGallery().then(
      (e) => {
        dispatch(successInitGalleryAction({ ...e.val() }));
      },
      (error) => dispatch(errorInitGalleryAction())
    );
  };
}
