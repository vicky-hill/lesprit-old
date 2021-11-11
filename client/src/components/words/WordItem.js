import React from 'react';

/* Props
=================================================== */
// onEdit: useState Function to open form
// word: Object


const WordItem = ({ onEdit, onDelete, word }) => {

    // Toggle edit icons
    const toggleOptions = (e) => {

        let toggleElement;

        if (e.target.tagName === 'P' || e.target.tagName === 'H3') {
            toggleElement = e.target.parentElement.parentElement;
        } else {
            toggleElement = e.target;
        }

        const listItems = document.querySelectorAll('.word-card');

        listItems.forEach(item => {
            if (item.classList.contains('show-edits') && !item.classList.contains(toggleElement.classList[1])) {
                item.classList.remove('show-edits');
            }
        })

        if (e.target.tagName === 'P' || e.target.tagName === 'H3') {
            e.target.parentElement.parentElement.classList.toggle('show-edits');
        } else {
            e.target.classList.toggle('show-edits');
        }
    }


    return (
        <div className="word-card" onClick={toggleOptions}>
            <div className="word-card--text">
                <h3>{word.foreign}</h3>
                <p>{word.native}</p>
            </div>
            <div className="word-card--edits">
                <i className="far fa-edit" onClick={onEdit}></i>
                <i className="far fa-trash-alt" onClick={onDelete}></i>
            </div>
        </div>
    )
}

export default WordItem;
