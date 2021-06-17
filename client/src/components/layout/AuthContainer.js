import React from 'react';

function MainContainer({ children }) {
    return (
        <div className="container auth-container">
            { children }
        </div>
    )
}

export default MainContainer;