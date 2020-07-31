import React, { useState, useCallback } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';

const GraphButtons = (): JSX.Element => {
  const [move, setMove] = useState<boolean>(true);
  const [draw, setDraw] = useState<boolean>(false);
  const [deleteCircle, setDeleteCircle] = useState<boolean>(false);
  const [connectCircles, setConnectCircles] = useState<boolean>(false);

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
    // setMovingCircle({ x: 0, y: 0, id: -1 });
    setMove(false);
    setDraw(false);
    setDeleteCircle(false);
    setConnectCircles(!connectCircles);
  }, [connectCircles]);

  return (
    <div className="controller">
      <Button variant="outlined">Move</Button>
      <Button variant="outlined">Add</Button>
      <Button variant="outlined">Delete</Button>
      <Button variant="outlined">Connect</Button>
      <Menu id="simple-menu" open={true}>
        <MenuItem>Graph1</MenuItem>
        <MenuItem>Graph2</MenuItem>
        <MenuItem>Graph3</MenuItem>
      </Menu>
      <button type="button">save graph</button>
    </div>
  );
};

export default GraphButtons;
