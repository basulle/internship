import { Point } from '../interfaces/point';

export const findPoint = (points: Point[], id: number): Point => {
  const founded = points.find((point) => {
    if (point.id === id) {
      return point;
    }
    return null;
  });
  return founded;
};
