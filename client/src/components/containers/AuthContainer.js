import React from 'react';

function AuthContainer({ children }) {
    return (
        <div className="container auth-container">
            { children }
        </div>
    )
}

export default AuthContainer;