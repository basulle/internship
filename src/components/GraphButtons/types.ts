import { Point } from '../../core/interfaces/point';
import { Line } from '../../core/interfaces/line';

export interface Props {
  points: Point[];
  lines: Line[];
  setSelectedGraph: React.Dispatch<React.SetStateAction<string>>;
  selectedGraph: string;
}
