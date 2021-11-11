import React, { useState, useEffect } from 'react';

function InputText({ text, onSubmit }) {

    const [input, setInput] = useState(text);

    function onChange(e) {
        setInput(e.target.value)
    }

    function onBlur(e) {
        onSubmit(e.target.value);
    }


    useEffect(() => {
        setInput(text)
    }, [text])

    return (
        <input type="text" className="input-text" value={input || "" } onChange={onChange} onBlur={onBlur} />
    )
}

export default InputText;
