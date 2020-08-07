import React, { useState, useCallback, useEffect } from 'react';
import { Button, Select, MenuItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectGraphsState } from '../../../../core/selectors/graph';
import { Props } from './types';
import { saveGraph, deleteGraph, createGraph } from '../../../../core/thunks/graph';

const GraphButtons = ({
  points,
  lines,
  setSelectedGraph,
  selectedGraph,
  setAlgorithm,
  selectedAlgorithm,
  setControlButton,
  controlButton,
  setAlgorithmResult,
}: Props): JSX.Element => {
  const dispatch = useDispatch();
  const state = useSelector(selectGraphsState);
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    setKeys([...Object.keys(state)]);
  }, [state]);

  const handleClick = useCallback(
    (action: string) => () => {
      setControlButton(controlButton !== action ? action : '');
    },
    [setControlButton, controlButton]
  );

  const handleChange = useCallback(
    (event) => {
      setSelectedGraph(event.target.value);
    },
    [setSelectedGraph]
  );

  const handleAlgorithmChange = useCallback(
    (event) => {
      setAlgorithmResult([]);
      setAlgorithm(event.target.value);
    },
    [setAlgorithm, setAlgorithmResult]
  );

  const handleSaveGraph = useCallback(() => {
    if (points.length > 0 && lines.length > 0) {
      if (selectedGraph === 'new') {
        dispatch(createGraph(points, lines));
      }
      if (selectedGraph !== 'new') {
        dispatch(saveGraph(points, lines, selectedGraph));
      }
    }
  }, [dispatch, points, lines, selectedGraph]);

  const handleDeleteGraph = useCallback(() => {
    dispatch(deleteGraph(selectedGraph));
  }, [selectedGraph, dispatch]);

  return (
    <div className="controller">
      <Button
        variant="outlined"
        onClick={handleClick('move')}
        color={controlButton === 'move' ? 'primary' : 'secondary'}
      >
        Move
      </Button>
      <Button
        variant="outlined"
        onClick={handleClick('draw')}
        color={controlButton === 'draw' ? 'primary' : 'secondary'}
      >
        Add
      </Button>
      <Button
        variant="outlined"
        onClick={handleClick('delete')}
        color={controlButton === 'delete' ? 'primary' : 'secondary'}
      >
        Delete
      </Button>
      <Button
        variant="outlined"
        onClick={handleClick('connect')}
        color={controlButton === 'connect' ? 'primary' : 'secondary'}
      >
        Connect
      </Button>
      <button type="button" onClick={handleSaveGraph}>
        save graph
      </button>
      <Select labelId="demo-simple-select-label" id="demo-simple-select" value={selectedGraph} onChange={handleChange}>
        <MenuItem value="new">New graph</MenuItem>
        {keys.map((key, index) => (
          <MenuItem key={key} value={key}>
            {index + 1}
          </MenuItem>
        ))}
      </Select>
      {selectedGraph !== 'new' ? (
        <button type="button" onClick={handleDeleteGraph}>
          delete graph
        </button>
      ) : null}
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedAlgorithm}
        onChange={handleAlgorithmChange}
      >
        <MenuItem value="algorithm">Algorithms</MenuItem>
        <MenuItem value="bfs">bfs</MenuItem>
        <MenuItem value="dfs">dfs</MenuItem>
      </Select>
      <Link to="/home" style={{ textDecoration: 'none' }}>
        <button type="button">Home</button>
      </Link>
    </div>
  );
};

export default GraphButtons;
