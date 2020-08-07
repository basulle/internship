import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase';
import { CircularProgress } from '@material-ui/core';
import { Mouse } from '../../core/interfaces/mouse';
import { Point } from '../../core/interfaces/point';
import { Line } from '../../core/interfaces/line';
import { findPoint } from '../../core/helpers/findPoint';
import GraphButtons from './components/GraphButtons/GraphButtons';
import { selectGraphsState, selectIsLoadingState } from '../../core/selectors/graph';
import { bfs, dfs, linesToAdjacencyMatrix } from './algorithms';
import { downloadGraphs } from '../../core/thunks/graph';
import { drawCircle, drawLine } from '../../core/helpers/canvas';
import './styles.css';

const Graph = (): JSX.Element => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const dispatch = useDispatch();
  const allGraphs = useSelector(selectGraphsState);
  const isLoadingState = useSelector(selectIsLoadingState);
  const [algorithm, setAlgorithm] = useState<string>('algorithm');
  const [counter, setCounter] = useState<number>(points.length);
  const [selectedGraph, setSelectedGraph] = useState<string>('new');
  const [mouse, setMouse] = useState<Mouse>({ x: 0, y: 0, down: false });
  const [movingCircle, setMovingCircle] = useState<Point>({ x: 0, y: 0, id: -1 });
  const [controlButton, setControlButton] = useState<string>('move');
  const [algorithmResult, setAlgorithmResult] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(isLoadingState);
  }, [isLoadingState]);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    dispatch(downloadGraphs(user.uid));
  }, [dispatch]);

  useEffect(() => {
    if (selectedGraph !== 'new') {
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
    points.forEach((point) => {
      if (movingCircle.id === point.id) {
        drawCircle(point.x, point.y, 20, 0, Math.PI * 2, point.id, canvasRef, '#00FFBB');
      } else {
        drawCircle(point.x, point.y, 20, 0, Math.PI * 2, point.id, canvasRef, '#fc0');
      }
    });

    lines.forEach((line) => {
      drawLine(findPoint(points, line.id1), findPoint(points, line.id2), canvasRef, '#fc0');
    });
  }, [points, lines, movingCircle, algorithmResult]);

  const handleAddCircle = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (controlButton === 'draw') {
      drawCircle(x, y, 20, 0, Math.PI * 2, counter, canvasRef, '#fc0');
      setPoints([...points, { x, y, id: counter }]);
      setCounter(counter + 1);
    }
  };

  const handleMouseMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      if (controlButton === 'move' && mouseDown) {
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
      }
    },
    [mouse, points, movingCircle, controlButton, mouseDown]
  );

  const handleMouseDown = useCallback(() => {
    setMouseDown(true);
    points.forEach((item) => {
      if (Math.pow(mouse.x - item.x, 2) + Math.pow(mouse.y - item.y, 2) <= 200) {
        if (controlButton === 'connect') {
          if (movingCircle.id < 0) {
            setMovingCircle({ x: item.x, y: item.y, id: item.id });
          } else {
            drawLine(movingCircle, { x: item.x, y: item.y, id: item.id }, canvasRef, '#fc0');
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
    setMouseDown(false);
    if (controlButton === 'move') {
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
  }, [mouse, points, lines, controlButton]);

  const handleAlgoritmStart = useCallback(() => {
    const matrix = linesToAdjacencyMatrix(points, lines);
    if (matrix.length > 0) {
      if (algorithm === 'bfs') {
        setAlgorithmResult(bfs(matrix, 0).map((item) => points[item].id));
      }
      if (algorithm === 'dfs') {
        setAlgorithmResult(dfs(matrix, 0).map((item) => points[item].id));
      }
    }
  }, [lines, points, algorithm]);

  return (
    <div className="container">
      <h1>Graphs</h1>
      {isLoading ? (
        <div className="loader">
          <CircularProgress color="secondary" size="6rem" />
        </div>
      ) : null}
      <GraphButtons
        points={points}
        lines={lines}
        setSelectedGraph={setSelectedGraph}
        selectedGraph={selectedGraph}
        setAlgorithm={setAlgorithm}
        selectedAlgorithm={algorithm}
        setControlButton={setControlButton}
        controlButton={controlButton}
        setAlgorithmResult={setAlgorithmResult}
      />
      {algorithm !== 'algorithm' ? (
        <button type="button" onClick={handleAlgoritmStart}>
          Start the algorithm!
        </button>
      ) : null}
      {algorithmResult}
      <canvas
        ref={canvasRef}
        width="1000px"
        height="700px"
        onClick={handleAddCircle}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};

export default Graph;
