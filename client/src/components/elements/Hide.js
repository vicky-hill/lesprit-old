import React from 'react';
import { connect } from 'react-redux'
import { closeHide } from 'actions/utils'

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


function Hide({ open, children }) {
    return (
        <div className={`${ !open && 'hidden'}`}>
            { children }
        </div>
    )
}

// export const hide = (setState) => {
//     setState(true);
// }   

// Hide by clicking on element with id
// export const hideByClick = (setState, id = 'closing-x') => {
//     document.addEventListener('click', function (e) {
//         if (e.target.id === id) {
//             setState(true);
//         }
//     });
// }

const mapStateToProps = state => ({
    open: state.utils.hide
})

export default connect(mapStateToProps, { closeHide })(Hide);
