import React, { useState, useCallback, useEffect } from 'react';
import { Button, Select, MenuItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { graphs } from '../../../../core/selectors/graph';
import { Props } from './types';
import { saveGraph } from '../../../../core/thunks/grapActions';

const GraphButtons = ({
  points,
  lines,
  setSelectedGraph,
  selectedGraph,
  setAlgorithm,
  selectedAlgorithm,
  setControlButton,
  controlButton,
}: Props): JSX.Element => {
  const dispatch = useDispatch();
  const state = useSelector(graphs);
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    setKeys([...Object.keys(state)]);
  }, [state]);

  const handleMove = useCallback(() => {
    if (controlButton === 'move') {
      setControlButton('');
    } else {
      setControlButton('move');
    }
  }, [setControlButton, controlButton]);

  const handleDraw = useCallback(() => {
    if (controlButton === 'draw') {
      setControlButton('');
    } else {
      setControlButton('draw');
    }
  }, [setControlButton, controlButton]);

  const handleDelete = useCallback(() => {
    if (controlButton === 'delete') {
      setControlButton('');
    } else {
      setControlButton('delete');
    }
  }, [setControlButton, controlButton]);

  const handleConnect = useCallback(() => {
    if (controlButton === 'connect') {
      setControlButton('');
    } else {
      setControlButton('connect');
    }
  }, [setControlButton, controlButton]);

  const handleChange = useCallback(
    (event) => {
      setSelectedGraph(event.target.value);
    },
    [setSelectedGraph]
  );

  const handleAlgorithmChange = useCallback(
    (event) => {
      setAlgorithm(event.target.value);
    },
    [setAlgorithm]
  );

  const handleSaveGraph = useCallback(() => {
    dispatch(saveGraph(points, lines, selectedGraph));
  }, [dispatch, points, lines, selectedGraph]);

  return (
    <div className="controller">
      <Button variant="outlined" onClick={handleMove} color={controlButton === 'move' ? 'primary' : 'secondary'}>
        Move
      </Button>
      <Button variant="outlined" onClick={handleDraw} color={controlButton === 'draw' ? 'primary' : 'secondary'}>
        Add
      </Button>
      <Button variant="outlined" onClick={handleDelete} color={controlButton === 'delete' ? 'primary' : 'secondary'}>
        Delete
      </Button>
      <Button variant="outlined" onClick={handleConnect} color={controlButton === 'connect' ? 'primary' : 'secondary'}>
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
      <button type="button">
        <Link to="/home" style={{ textDecoration: 'none' }}>
          Home
        </Link>
      </button>
    </div>
  );
};

export default GraphButtons;
