import { Point } from '../interfaces/point';

export const drawCircle = (
  x: number,
  y: number,
  r: number,
  sAngle: number,
  eAngle: number,
  count: number,
  canvasRef: React.MutableRefObject<HTMLCanvasElement>
) => {
  const context = canvasRef.current.getContext('2d');
  context.strokeStyle = '#000';
  context.fillStyle = '#fc0';
  context.globalCompositeOperation = 'source-over';
  context.lineWidth = 1;
  context.beginPath();
  context.arc(x, y, r, sAngle, eAngle);
  context.stroke();
  context.fill();
  context.font = '18px serif';
  context.fillStyle = '#000';
  context.fillText(count.toString(), x - 5, y + 5);
  context.closePath();
};

export const drawLine = (p1: Point, p2: Point, canvasRef: React.MutableRefObject<HTMLCanvasElement>) => {
  const context = canvasRef.current.getContext('2d');
  context.globalCompositeOperation = 'destination-over';
  context.strokeStyle = '#fc0';
  context.beginPath();
  context.moveTo(p1.x, p1.y);
  context.lineTo(p2.x, p2.y);
  context.lineWidth = 3;
  context.stroke();
};
