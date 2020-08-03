import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { buttonsState } from '../../core/selectors/buttons';
import { Mouse } from '../../core/interfaces/mouse';
import { Point } from '../../core/interfaces/point';
import { Line } from '../../core/interfaces/line';
import { findPoint } from '../../core/helpers/findPoint';
import GraphButtons from '../../components/GraphButtons/GraphButtons';
import { graphs } from '../../core/selectors/graph';
import { dfs } from './algorithms';
import './Graph.css';

const Graph = (): JSX.Element => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const allGraphs = useSelector(graphs);
  const state = useSelector(buttonsState);
  const [counter, setCounter] = useState<number>(points.length);
  const [selectedGraph, setSelectedGraph] = useState<string>('');
  const [mouse, setMouse] = useState<Mouse>({ x: 0, y: 0, down: false });
  const [move, setMove] = useState<boolean>(true);
  const [draw, setDraw] = useState<boolean>(false);
  const [deleteCircle, setDeleteCircle] = useState<boolean>(false);
  const [connectCircles, setConnectCircles] = useState<boolean>(false);
  const [movingCircle, setMovingCircle] = useState<Point>({ x: 0, y: 0, id: -1 });

  useEffect(() => {
    setMove(state.move);
    setDraw(state.draw);
    setDeleteCircle(state.deleteCircle);
    setConnectCircles(state.connectCircles);
  }, [state]);

  useEffect(() => {
    if (selectedGraph.length > 3) {
      setPoints(allGraphs[selectedGraph].points);
      setLines(allGraphs[selectedGraph].lines);
      setCounter(allGraphs[selectedGraph].points.length + 1);
    } else {
      setPoints([]);
      setLines([]);
      setCounter(0);
    }
  }, [selectedGraph, allGraphs]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, 1000, 700);
    points.forEach((i) => {
      drawCircle(i.x, i.y, 20, 0, Math.PI * 2, i.id);
    });
    lines.forEach((line) => {
      drawLine(findPoint(points, line.id1), findPoint(points, line.id2));
    });
  }, [points, lines]);

  const drawCircle = (x: number, y: number, r: number, sAngle: number, eAngle: number, count: number) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
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

  const drawLine = (p1: Point, p2: Point) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.globalCompositeOperation = 'destination-over';
    context.strokeStyle = '#fc0';
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.lineWidth = 3;
    context.stroke();
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (draw) {
      drawCircle(x, y, 20, 0, Math.PI * 2, counter);
      setPoints([...points, { x, y, id: counter }]);
      setCounter(counter + 1);
    }
  };

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const handleMouseDown = useCallback(() => {
    points.forEach((item) => {
      if (Math.pow(mouse.x - item.x, 2) + Math.pow(mouse.y - item.y, 2) <= 200) {
        if (connectCircles) {
          if (movingCircle.id < 0) {
            setMovingCircle({ x: item.x, y: item.y, id: item.id });
          } else {
            drawLine(movingCircle, { x: item.x, y: item.y, id: item.id });
            if (movingCircle.id < item.id) {
              setLines([...lines, { id1: movingCircle.id, id2: item.id }]);
            } else {
              setLines([...lines, { id1: item.id, id2: movingCircle.id }]);
            }
            setMovingCircle({ x: 0, y: 0, id: -1 });
          }
        } else if (move) {
          setMovingCircle({ x: item.x, y: item.y, id: item.id });
        } else {
          setMovingCircle({ x: 0, y: 0, id: -1 });
        }
      }
    });
  }, [mouse, points, connectCircles, movingCircle, lines, move]);

  const handleMouseUp = useCallback(() => {
    if (move) {
      setPoints(
        points.map((point) => {
          if (point.id === movingCircle.id) {
            return {
              x: mouse.x,
              y: mouse.y,
              id: point.id,
            };
          }
          return point;
        })
      );
      setMovingCircle({ x: 0, y: 0, id: -1 });
    }
    if (deleteCircle) {
      points.forEach((item) => {
        if (Math.pow(mouse.x - item.x, 2) + Math.pow(mouse.y - item.y, 2) <= 200) {
          let deleted: Point;
          setPoints(
            points.filter((point) => {
              if (point.id !== item.id) {
                return point;
              }
              deleted = point;
              return null;
            })
          );
          setLines(lines.filter((line) => line.id1 !== deleted.id && line.id2 !== deleted.id));
        }
      });
    }
  }, [mouse, points, movingCircle, deleteCircle, move, lines]);

  const linesToAdjacencyMatrix = useCallback(() => {
    const matrix: number[][] = [];

    for (let i = 0; i < points.length; i++) {
      matrix.push([]);
      for (let j = 0; j < points.length; j++) {
        matrix[i].push(0);
      }
    }

    let index1;
    let index2;
    for (const line of lines) {
      for (let i = 0; i < points.length; i++) {
        if (line.id1 === points[i].id) {
          index1 = i;
        }
        if (line.id2 === points[i].id) {
          index2 = i;
          matrix[index1][index2] = 1;
          matrix[index2][index1] = 1;
        }
      }
    }
    dfs(matrix, 0);
  }, [lines, points]);

  return (
    <div className="container">
      <h1>Graphs</h1>
      <button type="button" onClick={linesToAdjacencyMatrix}>
        test
      </button>
      <GraphButtons points={points} lines={lines} setSelectedGraph={setSelectedGraph} selectedGraph={selectedGraph} />
      <canvas
        ref={canvasRef}
        width="1000px"
        height="700px"
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};

export default Graph;
