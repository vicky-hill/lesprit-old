import React, { useState } from 'react';

function InputText({ children }) {

    const [input, setInput] = useState(children);

    function onChange(e) {
        setInput(e.target.value)
    }

    return (
        <input type="text" className="input-text" value={input} onChange={onChange} />
    )
}

export default InputText;
