import React from 'react';

import './Button.css';


const Kinds = {
    danger: "btn-danger",
    change: "btn-change",
    success: "btn-success",
}

export const Button = ({kind, className, ...others}) => {
    const buttonClassName = (className || '') + " " + (Kinds[kind] || '');
    return <button className={buttonClassName} {...others}/>
}