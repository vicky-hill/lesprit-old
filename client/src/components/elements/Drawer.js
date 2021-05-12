import React from 'react';

function Drawer({ authenticated, username}) {
    return (
        <div>
            { authenticated ? <h4> {username} </h4> : null }
            <button className="transparent-btn">Log Out</button>
        </div>
    )
}

export default Drawer;
