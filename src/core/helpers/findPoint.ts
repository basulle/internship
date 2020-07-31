import { PointsInterface } from '../interfaces/graph';

export const findPoint = (points: PointsInterface[], id: number): PointsInterface => {
  const founded = points.find((point) => {
    if (point.id === id) {
      return point;
    }
    return null;
  });
  return founded;
};
