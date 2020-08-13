/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback } from 'react';
import { Props } from './types';
import './styles.css';

const GraphItem = ({ index, value, setSelectedGraph, selectedGraph }: Props): JSX.Element => {
  const handleClick = useCallback(() => {
    setSelectedGraph(value);
  }, [setSelectedGraph, value]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className={selectedGraph === value ? 'graph-item selected' : 'graph-item'} onClick={handleClick}>
      {index === 0 ? <h3>New Graph</h3> : <h3>Graph {index}</h3>}
    </div>
  );
};

export default GraphItem;

// {selectedGraph === value ? (
//     <div className="graph-item-buttons">
//       <img src="https://img.icons8.com/fluent/20/000000/save.png" alt="save" />
//       {index !== 0 ? (
//         <div>
//           <img src="https://img.icons8.com/fluent/20/000000/delete-sign.png" alt="delete" />
//           <img src="https://img.icons8.com/color/20/000000/gallery.png" alt="gallery" />
//         </div>
//       ) : null}
//     </div>
//   ) : null}
