import React, { useContext } from 'react';

import { NumberMapContext } from './NumberMapContext';

const Table = ({ headers, cellData }) => {
    const { convertToOdia } = useContext(NumberMapContext);
    return (
        <div className="table">
            <div className="row header">
                {headers.map((header, index) => (
                    <div className="cell" key={index}>{header}</div>
                ))}
            </div>
            {cellData.map((row, rowIndex) => (
                <div className="row" key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                        <div className="cell" key={cellIndex}>
                            {cell && <span className='date'>{convertToOdia(cell)}</span>}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Table;