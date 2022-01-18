import React, { forwardRef } from 'react';

/* Props
=================================================== */
// onSubmit: Function
// format: String | half, full
// type: String
// name: String


/* Sub Components
=========================================== */
// FormContainer
// Heading
// Input
// SubmitButton



const Form = ({ onSubmit, children, id }) => {


    return (
        <form onSubmit={onSubmit} id={id}>
            {children}
        </form>
    )
}

export const FormContainer = ({ children, format }) => {
    return (
        <div className={`form-container ${format && format}`}>
            {children}
        </div>
    )
}

export const Heading = ({ children }) => {
    return (
        <h1 className="form-heading">
            {children}
        </h1>
    )
}

export const Input = forwardRef((props, ref) => {
    return (
        <div className="input-container">
            <input {...props} ref={ref} />
            <small className="invalid">{ props.validation }</small>
        </div>
    )
})

export const TextArea = (props) => {
    return (
        <div className="input-container">
            <textarea  {...props} cols="30" rows="4"></textarea>
            <small>{ props.small }</small>
        </div>
    )
}

export const SubmitButton = ({ title }) => {
    return (
        <button type="submit">{title}</button>
    )
}

Input.defaultProps = {
    type: "text",
    id: ""
}

export default Form;
