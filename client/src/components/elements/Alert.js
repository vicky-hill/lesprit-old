import React from 'react';

/* Props
=========================================== */
// message: String
// type: String | danger, success, info

function Alert({ message, type}) {
    return (
        <div className={`alert alert-${type}`}>
            <p>{message}</p>
        </div>
    )
}

export default Alert;
