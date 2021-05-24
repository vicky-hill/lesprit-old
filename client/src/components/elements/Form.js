import React from 'react';

/* Props
=================================================== */
// onSubmit: Function
// format: String | half

const Form = ({ onSubmit, format, children }) => {
    return (
        <div className={`form-container ${format && format}`}>
            <form onSubmit={onSubmit}>
                {children}
            </form>
        </div>
    )
}

export const Heading = ({ children }) => {
    return (
        <h1 className="form-heading">
            { children}
        </h1>
    )
}

export const Input = ({ placeholder, value, onChange }) => {
    return (
        <input autoComplete="off" autoCapitalize="none" type="text" placeholder={placeholder} value={value} onChange={onChange} />
    )
}

export const SubmitButton = ({ title }) => {
    return (
        <button type="submit">{title}</button>
    )
}

export default Form;
