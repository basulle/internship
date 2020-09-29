import React, { useCallback, useState } from 'react';
import { TextField } from '@material-ui/core';
import './styles.css';
import { Props } from './types';

const SavingGraphModal = ({ setShowModal, setGraphName, graphName, handleSaveGraph }: Props): JSX.Element => {
  const [error, setError] = useState<boolean>(false);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setGraphName('');
  }, [setShowModal, setGraphName]);

  const handleChange = useCallback(
    ({ target: { value } }) => {
      setError(false);
      if (value.length > 14) {
        setError(true);
      } else {
        setGraphName(value);
      }
    },
    [setGraphName]
  );

  const handleSave = useCallback(() => {
    if (!error) {
      handleSaveGraph('');
      setShowModal(false);
      setGraphName('');
    }
  }, [handleSaveGraph, setShowModal, setGraphName, error]);

  return (
    <div className="modal">
      <h3>Saving Graph</h3>
      Graph Name:
      <TextField value={graphName} onChange={handleChange} error={error} />
      {error ? 'Cannot be more than 14 letters' : null}
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
