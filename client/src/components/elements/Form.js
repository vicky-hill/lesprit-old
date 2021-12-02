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

export const Input = forwardRef(({ placeholder, value, onChange, type, name, validation }, ref) => {
    return (
        <div className="input-container">
            <input ref={ref} id={name} name={name} autoComplete="off" autoCapitalize="none" type={type} placeholder={placeholder} value={value} onChange={onChange} />
            <small className="invalid">{ validation }</small>
        </div>
    )
})

export const TextArea = ({ value, name, placeholder, onChange, onMouseUp, small }) => {
    return (
        <div className="input-container">
            <textarea value={value} name={name} id={name} onChange={onChange} placeholder={placeholder} onMouseUp={onMouseUp} cols="30" rows="4"></textarea>
            <small>{ small }</small>
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
