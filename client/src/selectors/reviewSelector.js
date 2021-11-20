import { createSelector } from 'reselect';

const wordsSelector = state => state.words.words;

const getReview = (words) => {
    return words.filter(word => {
        const due = new Date(word.dueDate)
        const now = new Date()
        
        if(due < now) {
            return word
        } else {
            return null
        }
    })
}

export default createSelector(
    wordsSelector,
    getReview
)