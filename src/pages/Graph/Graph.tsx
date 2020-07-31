import React, { useState, useEffect, useCallback } from 'react';
import { Button, MenuItem, Select } from '@material-ui/core';
import firebase from 'firebase';
import { MouseInterface, PointsInterface, LinesInterface } from '../../core/interfaces/graph';
import { findPoint } from '../../core/helpers/findPoint';
import './Graph.css';

const Graph = (): JSX.Element => {
  const canvasRef = React.useRef(null);
  const [points, setPoints] = useState<PointsInterface[]>([
    { x: 250, y: 250, id: 0 },
    { x: 350, y: 350, id: 1 },
    { x: 450, y: 250, id: 2 },
  ]);
  const [lines, setLines] = useState<LinesInterface[]>([
    { id1: 0, id2: 1 },
    { id1: 1, id2: 2 },
  ]);
  const [counter, setCounter] = useState<number>(points.length);
  const [mouse, setMouse] = useState<MouseInterface>({ x: 0, y: 0, down: false });
  const [move, setMove] = useState<boolean>(true);
  const [draw, setDraw] = useState<boolean>(false);
  const [deleteCircle, setDeleteCircle] = useState<boolean>(false);
  const [connectCircles, setConnectCircles] = useState<boolean>(false);
  const [movingCircle, setMovingCircle] = useState<PointsInterface>({ x: 0, y: 0, id: -1 });

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
    context.fillText(count, x - 5, y + 5);
    context.closePath();
  };

  const drawLine = (p1: PointsInterface, p2: PointsInterface) => {
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
            setLines([...lines, { id1: movingCircle.id, id2: item.id }]);
            setMovingCircle({ x: 0, y: 0, id: -1 });
          }
        } else {
          setMovingCircle({ x: item.x, y: item.y, id: item.id });
        }
      }
    });
  }, [mouse, points, connectCircles, movingCircle, lines]);

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
          let deleted: PointsInterface;
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

  const handleMove = useCallback(() => {
    setMove(!move);
    setDraw(false);
    setDeleteCircle(false);
    setConnectCircles(false);
  }, [move]);

  const handleDraw = useCallback(() => {
    setMove(false);
    setDraw(!draw);
    setDeleteCircle(false);
    setConnectCircles(false);
  }, [draw]);

  const handleDelete = useCallback(() => {
    setMove(false);
    setDraw(false);
    setDeleteCircle(!deleteCircle);
    setConnectCircles(false);
  }, [deleteCircle]);

  const handleConnect = useCallback(() => {
    setMovingCircle({ x: 0, y: 0, id: -1 });
    setMove(false);
    setDraw(false);
    setDeleteCircle(false);
    setConnectCircles(!connectCircles);
  }, [connectCircles]);

  const handleSaveGraph = useCallback(() => {
    const user = firebase.auth().currentUser;
    firebase.database().ref().child('users').child(user.uid).child('graphs').push({
      points,
      lines,
    });
  }, [points, lines]);

  return (
    <div className="container">
      <h1>Graphs</h1>
      <div className="controller">
        <Button variant="outlined" onClick={handleMove} color={move ? 'primary' : 'secondary'}>
          Move
        </Button>
        <Button variant="outlined" onClick={handleDraw} color={draw ? 'primary' : 'secondary'}>
          Add
        </Button>
        <Button variant="outlined" onClick={handleDelete} color={deleteCircle ? 'primary' : 'secondary'}>
          Delete
        </Button>
        <Button variant="outlined" onClick={handleConnect} color={connectCircles ? 'primary' : 'secondary'}>
          Connect
        </Button>
        <button type="button" onClick={handleSaveGraph}>
          save graph
        </button>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value="10"
          // onChange={handleChange}
        >
          <MenuItem value={10}>Graph 1</MenuItem>
          <MenuItem value={20}>Graph 2</MenuItem>
          <MenuItem value={30}>Graph 3</MenuItem>
        </Select>
      </div>
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
