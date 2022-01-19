import React from 'react';

/* Props
=================================================== */
// type: String | transparent, regular
// id: optional #
// onClick: Function




const Button = React.forwardRef((props, ref) => {
    const { children, type, classes } = props;

    return (
        <button { ...props } ref={ref} className={`${type}-btn ${classes}`} >
            { children }
        </button>
    )
})

Button.defaultProps = {    
    type: "regular",
    id: ""
}

export default Button;
