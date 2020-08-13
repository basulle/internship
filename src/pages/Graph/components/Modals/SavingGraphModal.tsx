import React, { useCallback } from 'react';
import { TextField } from '@material-ui/core';
import './styles.css';
import { Props } from './types';

const SavingGraphModal = ({ setShowModal, setGraphName, graphName, handleSaveGraph }: Props): JSX.Element => {
  const handleClose = useCallback(() => {
    setShowModal(false);
    setGraphName('');
  }, [setShowModal, setGraphName]);

  const handleChange = useCallback(
    ({ target: { value } }) => {
      setGraphName(value);
    },
    [setGraphName]
  );

  const handleSave = useCallback(() => {
    handleSaveGraph('');
    setShowModal(false);
    setGraphName('');
  }, [handleSaveGraph, setShowModal, setGraphName]);

  return (
    <div className="modal">
      <h3>Saving Graph</h3>
      Graph Name:
      <TextField value={graphName} onChange={handleChange} />
      <div className="buttons">
        <button type="button" onClick={handleSave}>
          save
        </button>
        <button type="button" onClick={handleClose}>
          close
        </button>
      </div>
    </div>
  );
};

export default SavingGraphModal;
