import React, { useCallback, useState } from 'react';
import { Button, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Props } from './types';
import { saveGraph, deleteGraph, createGraph, addToGallery } from '../../../../core/thunks/graph';
import SavingGraphModal from '../Modals/SavingGraphModal';

const useStyles = makeStyles({
  select: {
    color: 'white',
  },
});

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
  canvas,
}: Props): JSX.Element => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [graphName, setGraphName] = useState<string>('');

  const handleClick = useCallback(
    (action: string) => () => {
      setControlButton(controlButton !== action ? action : '');
    },
    [setControlButton, controlButton]
  );

  const handleAlgorithmChange = useCallback(
    (event) => {
      setAlgorithmResult([]);
      setAlgorithm(event.target.value);
    },
    [setAlgorithm, setAlgorithmResult]
  );

  const handleShowModal = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  const handleSaveGraph = useCallback(() => {
    if (points.length > 0 && lines.length > 0) {
      const copyCanvas = document.createElement('canvas');
      const { current } = canvas;
      const scale = 0.2;
      copyCanvas.width = current.width * scale;
      copyCanvas.height = current.height * scale;
      const ctx = copyCanvas.getContext('2d');
      ctx.fillStyle = '#24283d';
      ctx.fillRect(0, 0, copyCanvas.width, copyCanvas.height);
      ctx.drawImage(current, 0, 0, current.width, current.height, 0, 0, copyCanvas.width, copyCanvas.height);
      if (selectedGraph === 'new') {
        dispatch(createGraph(points, lines, graphName, copyCanvas.toDataURL()));
      }
      if (selectedGraph !== 'new') {
        dispatch(saveGraph(points, lines, selectedGraph, graphName, copyCanvas.toDataURL()));
      }
    }
  }, [dispatch, points, lines, selectedGraph, canvas, graphName]);

  const handleDeleteGraph = useCallback(() => {
    dispatch(deleteGraph(selectedGraph));
  }, [selectedGraph, dispatch]);

  const handleAddToGallery = useCallback(() => {
    dispatch(addToGallery(selectedGraph));
  }, [selectedGraph, dispatch]);

  return (
    <div className="controller">
      <div className="navigation">
        <div className="to-home">
          <Link to="/home" style={{ textDecoration: 'none' }}>
            <img src="https://img.icons8.com/flat_round/32/000000/left--v1.png" alt="arrow" />
          </Link>
        </div>
        <div className="to-gallery">
          <Link to="/gallery" style={{ textDecoration: 'none' }}>
            <img src="https://img.icons8.com/flat_round/32/000000/right--v1.png" alt="arrow" />
          </Link>
        </div>
      </div>
      <div className="buttons-row">
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
      </div>
      <div className="buttons-row">
        <Button variant="outlined" onClick={handleShowModal} color="primary">
          Save Graph
        </Button>
        {selectedGraph !== 'new' ? (
          <div style={{ flexDirection: 'row', display: 'flex' }}>
            <Button variant="outlined" onClick={handleDeleteGraph} color="secondary">
              Delete Graph
            </Button>
            <Button variant="outlined" color="primary" onClick={handleAddToGallery}>
              Add to gallery
            </Button>
          </div>
        ) : null}
      </div>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedAlgorithm}
        onChange={handleAlgorithmChange}
        className={classes.select}
      >
        <MenuItem value="algorithm">Algorithms</MenuItem>
        <MenuItem value="bfs">bfs</MenuItem>
        <MenuItem value="dfs">dfs</MenuItem>
      </Select>
      {showModal ? (
        <SavingGraphModal
          setShowModal={setShowModal}
          setGraphName={setGraphName}
          graphName={graphName}
          handleSaveGraph={handleSaveGraph}
        />
      ) : null}
    </div>
  );
};

export default GraphButtons;
