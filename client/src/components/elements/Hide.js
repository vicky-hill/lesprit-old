import React from 'react';
import { connect } from 'react-redux'
import { closeHide } from 'actions/utils'

function Hide({ open, children }) {
    return (
        <div className={`${ !open && 'hidden'}`}>
            { children }
        </div>
    )
}

const mapStateToProps = state => ({
    open: state.utils.hide
})

export default connect(mapStateToProps, { closeHide })(Hide);
