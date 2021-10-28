import React from 'react';

/* Props
=================================================== */
// type: String | transparent, regular
// id: optional #
// onClick: Function




function Button({ children, type, onClick, id }) {
    return (
        <button id={id} className={`${type}-btn`} onClick={onClick}>
            { children }
        </button>
    )
}

Button.defaultProps = {    
    type: "regular",
    id: ""
}

export default Button;
