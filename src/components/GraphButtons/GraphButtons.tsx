import React, { useState, useCallback, useEffect } from 'react';
import { Button, Select, MenuItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { buttonsAction } from '../../core/actions/buttonsStateAction';
import { graphs } from '../../core/selectors/graph';
import { Props } from './types';
import { saveGraph } from '../../core/actions/graphInitAction';

const GraphButtons = ({ points, lines, setSelectedGraph, selectedGraph }: Props): JSX.Element => {
  const dispatch = useDispatch();
  const state = useSelector(graphs);
  const [keys, setKeys] = useState<string[]>([]);
  const [move, setMove] = useState<boolean>(true);
  const [draw, setDraw] = useState<boolean>(false);
  const [deleteCircle, setDeleteCircle] = useState<boolean>(false);
  const [connectCircles, setConnectCircles] = useState<boolean>(false);

  useEffect(() => {
    dispatch(buttonsAction({ move, draw, deleteCircle, connectCircles }));
  }, [move, draw, deleteCircle, connectCircles, dispatch]);

  useEffect(() => {
    setKeys([...Object.keys(state)]);
  }, [state]);

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
    setMove(false);
    setDraw(false);
    setDeleteCircle(false);
    setConnectCircles(!connectCircles);
  }, [connectCircles]);

  const handleChange = useCallback(
    (event) => {
      setSelectedGraph(event.target.value);
    },
    [setSelectedGraph]
  );

  const handleSaveGraph = useCallback(() => {
    dispatch(saveGraph(points, lines, selectedGraph));
  }, [dispatch, points, lines, selectedGraph]);

  return (
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
      <Select labelId="demo-simple-select-label" id="demo-simple-select" value={selectedGraph} onChange={handleChange}>
        <MenuItem value={0}>New graph</MenuItem>
        {keys.map((key, index) => (
          <MenuItem key={key} value={key}>
            {index + 1}
          </MenuItem>
        ))}
      </Select>
      <Select labelId="demo-simple-select-label" id="demo-simple-select" value="1">
        <MenuItem value={1}>Algorithms</MenuItem>
        <MenuItem value={2}>bfs</MenuItem>
        <MenuItem value={3}>dfs</MenuItem>
      </Select>
    </div>
  );
};

export default GraphButtons;
