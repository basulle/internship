import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase';
import { Mouse } from '../../core/interfaces/mouse';
import { Point } from '../../core/interfaces/point';
import { Line } from '../../core/interfaces/line';
import { findPoint } from '../../core/helpers/findPoint';
import GraphButtons from './components/GraphButtons/GraphButtons';
import { graphs } from '../../core/selectors/graph';
import { bfs, dfs } from './algorithms';
import { downloadGraphs } from '../../core/thunks/grapActions';
import { drawCircle, drawLine } from '../../core/helpers/canvas';
import './styles.css';

const Graph = (): JSX.Element => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const dispatch = useDispatch();
  const allGraphs = useSelector(graphs);
  const [algorithm, setAlgorithm] = useState<string>('algorithm');
  const [counter, setCounter] = useState<number>(points.length);
  const [selectedGraph, setSelectedGraph] = useState<string>('new');
  const [mouse, setMouse] = useState<Mouse>({ x: 0, y: 0, down: false });
  const [movingCircle, setMovingCircle] = useState<Point>({ x: 0, y: 0, id: -1 });
  const [controlButton, setControlButton] = useState<string>('move');

  useEffect(() => {
    const user = firebase.auth().currentUser;
    dispatch(downloadGraphs(user.uid));
  }, [dispatch]);

  // useEffect(() => {
  //   setMove(buttons.move);
  //   setDraw(buttons.draw);
  //   setDeleteCircle(buttons.deleteCircle);
  //   setConnectCircles(buttons.connectCircles);
  // }, [buttons]);

  useEffect(() => {
    if (selectedGraph.length > 4) {
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
    const context = canvasRef.current.getContext('2d');
    context.clearRect(0, 0, 1000, 700);
    points.forEach((i) => {
      drawCircle(i.x, i.y, 20, 0, Math.PI * 2, i.id, canvasRef);
    });
    lines.forEach((line) => {
      drawLine(findPoint(points, line.id1), findPoint(points, line.id2), canvasRef);
    });
  }, [points, lines]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (controlButton === 'draw') {
      drawCircle(x, y, 20, 0, Math.PI * 2, counter, canvasRef);
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
        if (controlButton === 'connect') {
          if (movingCircle.id < 0) {
            setMovingCircle({ x: item.x, y: item.y, id: item.id });
          } else {
            drawLine(movingCircle, { x: item.x, y: item.y, id: item.id }, canvasRef);
            if (movingCircle.id < item.id) {
              setLines([...lines, { id1: movingCircle.id, id2: item.id }]);
            } else {
              setLines([...lines, { id1: item.id, id2: movingCircle.id }]);
            }
            setMovingCircle({ x: 0, y: 0, id: -1 });
          }
        } else if (controlButton === 'move') {
          setMovingCircle({ x: item.x, y: item.y, id: item.id });
        } else {
          setMovingCircle({ x: 0, y: 0, id: -1 });
        }
      }
    });
  }, [mouse, points, movingCircle, lines, controlButton]);

  const handleMouseUp = useCallback(() => {
    if (controlButton === 'move') {
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
    if (controlButton === 'delete') {
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
  }, [mouse, points, movingCircle, lines, controlButton]);

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
    if (algorithm === 'bfs') {
      console.log(bfs(matrix, 0));
    }
    if (algorithm === 'dfs') {
      console.log(dfs(matrix, 0));
    }
  }, [lines, points, algorithm]);

  return (
    <div className="container">
      <h1>Graphs</h1>
      <button type="button" onClick={linesToAdjacencyMatrix}>
        test
      </button>
      <GraphButtons
        points={points}
        lines={lines}
        setSelectedGraph={setSelectedGraph}
        selectedGraph={selectedGraph}
        setAlgorithm={setAlgorithm}
        selectedAlgorithm={algorithm}
        setControlButton={setControlButton}
        controlButton={controlButton}
      />
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
