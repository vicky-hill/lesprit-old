import React from 'react';

/* Props
=========================================== */
// children


function Container({ children }) {
    return (
        <div className={`container`}>
            { children }
        </div>
    )
}

export default Container;
