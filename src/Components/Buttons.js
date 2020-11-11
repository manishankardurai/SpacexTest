import React from 'react';
import classnames from 'classnames';

const ButtonComponent = ({ onClickProp, buttonValue, key, className = '' }) => {
    return (
        <button className={`btn btn-secondary btn-width-75 years-button ${className}`} onClick={onClickProp}>{buttonValue}</button>
    )
}

export default ButtonComponent;