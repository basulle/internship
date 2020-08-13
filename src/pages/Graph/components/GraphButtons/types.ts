import { Point } from '../../../../core/interfaces/point';
import { Line } from '../../../../core/interfaces/line';

export interface Props {
  points: Point[];
  lines: Line[];
  setSelectedGraph: React.Dispatch<React.SetStateAction<string>>;
  selectedGraph: string;
  setAlgorithm: React.Dispatch<React.SetStateAction<string>>;
  selectedAlgorithm: string;
  setControlButton: React.Dispatch<React.SetStateAction<string>>;
  controlButton: string;
  setAlgorithmResult: React.Dispatch<React.SetStateAction<number[]>>;
  canvas: React.MutableRefObject<HTMLCanvasElement>;
}
