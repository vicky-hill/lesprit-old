import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux'
import { closeSlide } from 'actions/utils'

/* Props
=================================================== */
// open: state
// closeSlide: action

function Slide({ open, closeSlide, children, id }) {

    const idRef = useRef(null);

    useEffect(() => {
        idRef.current = id;
    }, [id])

    return (
        <div className={`window slide-container ${open && 'slide-in'}`} id="slide-container">
            { children}
        </div>
    )
}

const mapStateToProps = state => ({
    open: state.utils.slide
})

export default connect(mapStateToProps, { closeSlide })(Slide);

