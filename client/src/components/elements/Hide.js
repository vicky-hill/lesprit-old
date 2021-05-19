import React from 'react';

/* Props
=================================================== */
// hidden: Boolean

/* Functions
=================================================== */
// hide(setState)

/* Usage
=================================================== */
// const [hidden, setHidden] = useState(true)
// <Hide hidden={hidden}> 
// <i onClick={() => setHidden(true)} className="fas fa-times">
// <Button onClick={() => setHidden(false)}>Click here</Button>


function Hide({ hidden, children }) {
    return (
        <div className={`${ hidden && 'hidden'}`}>
            { children }
        </div>
    )
}

export const hide = (setState) => {
    setState(true);
}   



/* Props
=================================================== */
// hidden: Boolean

/* Functions
=================================================== */
// hide(setState)

/* Use
=================================================== */
// hidden: Boolean

export default Hide;
