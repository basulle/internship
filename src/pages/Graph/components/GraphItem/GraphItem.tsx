/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback } from 'react';
import { Props } from './types';
import './styles.css';

const GraphItem = ({
  index,
  value,
  setSelectedGraph,
  selectedGraph,
  selectedGraphName,
  selectedGraphUrl,
}: Props): JSX.Element => {
  const handleClick = useCallback(() => {
    setSelectedGraph(value);
  }, [setSelectedGraph, value]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className={selectedGraph === value ? 'graph-item selected' : 'graph-item'} onClick={handleClick}>
      {index === 0 ? (
        <h3>New Graph</h3>
      ) : (
        <div className="graph-info">
          <img src={selectedGraphUrl} alt="graph" />
          <h3>{selectedGraphName}</h3>
        </div>
      )}
    </div>
  );
};

export default GraphItem;
