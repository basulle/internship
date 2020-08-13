import { createSelector } from 'reselect';
import * as gallery from '../reducers/gallery';
import { AppState } from '../reducers';

const galleryState = (state: AppState): gallery.State => state.galleryState;

export const selectGalleryState = createSelector(galleryState, (state) => state.graphs);
export const selectIsLoadingState = createSelector(galleryState, (state) => state.isLoading);
