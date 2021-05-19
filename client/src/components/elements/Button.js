import React from 'react';

/* Props
=================================================== */
// type: String | transparent, regular



function Button({ children, type, onClick }) {
    return (
        <button className={`${type}-btn`} onClick={onClick}>
            { children }
        </button>
    )
}

 Button.defaultProps = {    
    type: "regular"
}

export default Button;
