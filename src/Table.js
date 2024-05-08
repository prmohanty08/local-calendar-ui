import React, { useContext, useState, useEffect } from 'react';

import { NumberMapContext } from './NumberMapContext';

import './Table.css';

const Table = ({ headers, cellData, selectedValue, onDateClick }) => {
    const { convertToOdia } = useContext(NumberMapContext);
    const [selectedCell, setSelectedCell] = useState({});

    const handleCellClick = (date, rowIndex, cellIndex) => {
        setSelectedCell({ rowIndex, cellIndex });
        onDateClick(date);
    };

    const isCellSelected = (rowIndex, cellIndex) => {
        return selectedCell.rowIndex === rowIndex && selectedCell.cellIndex === cellIndex;
    };

    const getCellContentClassName = (rowIndex, cellIndex) => {
        return `cell-content ${isCellSelected(rowIndex, cellIndex) ? 'selected' : ''}`;
    };

    useEffect(() => {
        for (let rowIndex = 0; rowIndex < cellData.length; rowIndex++) {
            const cellIndex = cellData[rowIndex].indexOf(selectedValue);
            if (cellIndex !== -1) {
                setSelectedCell({ rowIndex, cellIndex });
                break;
            }
        }
    }, [cellData, selectedValue]);

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
                            {cell &&
                                <div className={getCellContentClassName(rowIndex, cellIndex)}>
                                    <span className='date clickable'
                                        key={rowIndex + '_' + cellIndex + '_' + cell + '_date'}
                                        onClick={() => handleCellClick(cell, rowIndex, cellIndex)}>
                                        {convertToOdia(cell)}
                                    </span>
                                    {isCellSelected(rowIndex, cellIndex) && <div className="horizontal-bar"></div>}
                                </div>
                            }
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Table;