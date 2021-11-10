import { createSelector } from 'reselect';

const listSelector = state => state.lists.activeList;
const wordsSelector = state => state.words.words;

const getWordList = (list, words) => {
    return words.filter(word => word.list._id === list._id)
}

export default createSelector(
    listSelector,
    wordsSelector,
    getWordList
)