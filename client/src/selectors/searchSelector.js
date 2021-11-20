import { createSelector } from 'reselect';

const wordsSelector = state => state.words.words;
const searchSelector = state => state.words.search;

const getSearchResult = (words, search) => {
    
    return search ? words.filter(word => word.foreign.includes(search) || word.native.includes(search)) : []
}

export default createSelector(
    wordsSelector,
    searchSelector,
    getSearchResult
)