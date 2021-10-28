import React from 'react';

/* Props
=================================================== */
// flex: Boolean

function ListContainer({ children, flex }) {
    return (
        <div className={`list-container ${flex && 'flex'}`}>
            { children }
        </div>
    )
}

export default ListContainer;
