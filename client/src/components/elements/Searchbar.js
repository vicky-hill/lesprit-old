import React from 'react';
import { connect } from 'react-redux'
import { onSearch } from 'actions/words'

function Searchbar({ onSearch, search }) {

    const onChange = (e) => {
        onSearch(e.target.value);
    }

    return (
        <div>
            <i className="fas fa-search input-icon" />
            <input className="searchbar rounded-input" type="text" placeholder="Search Vocabulary" value={search} onChange={onChange}/>
        </div>
    )
}

const mapStateToProps = state => ({
    search: state.words.search
})

export default connect(mapStateToProps, { onSearch })(Searchbar);

