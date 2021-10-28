import React from 'react';

function Searchbar() {
    return (
        <div>
            <i className="fas fa-search input-icon" />
            <input className="searchbar rounded-input" type="text" placeholder="Search Vocabulary" />
        </div>
    )
}

export default Searchbar;
