import React from 'react';

const Square = ({ value, onClick, isDisabled }) => {
    return (
        <button className="square" onClick={onClick} disabled={isDisabled}>
            {value}
        </button>
    );
};

export default Square;