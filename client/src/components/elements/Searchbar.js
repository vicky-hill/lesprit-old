import React from 'react';

function Searchbar() {
    return (
        <form>
            <i className="fas fa-search input-icon"></i>
            <input className="searchbar rounded-input" type="text" placeholder="Search Vocabulary" value="" onChange="" />
        </form>
    )
}

export default Searchbar;
