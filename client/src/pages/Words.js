import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'
import { getLists, displayList } from 'actions/lists'
import { getWords, openEdit, openCreate, deleteWord } from 'actions/words'
import { openSlide } from 'actions/utils';
import wordlistSelector from 'selectors/wordlistSelector'

import Container from 'components/containers/Container';
import ScrollContainer from 'components/containers/ScrollContainer';
import MainContainer from 'components/containers/MainContainer';
import ListContainer from 'components/containers/ListContainer';

import Hide from 'components/elements/Hide';
import Slide from 'components/elements/Slide';
import { hideByClick } from 'components/elements/Hide';

import WordForm from 'components/words/WordForm';
import WordItem from 'components/words/WordItem'
import WordsPanel from 'components/words/WordsPanel';



const Words = ({
    history,
    loading,
    displayList,
    activeList,
    match,
    wordList,
    getWords,
    getLists,
    openEdit,
    openCreate,
    openSlide,
    deleteWord
    }) => {

    const [hidden, setHidden] = useState(true);    // Half screen form

    hideByClick(setHidden, 'closing-x');

    useEffect(() => {
        loadData();
        // eslint-disable-next-line
    }, [])

    const loadData = async () => {
        await getWords();
        await getLists();
        await displayList(match.params.title)
    }

    const onCreate = () => {
        setHidden(false);
        openCreate();
    }

    const onEdit = (word) => {
        openSlide();
        openEdit(word._id, word.foreign, word.native);
    }

    const onDelete = (id) => {
        const c = window.confirm("Delete this word?");

        if (c) {
            deleteWord(id);
        }
    }

    return (
        <Container>
            <ScrollContainer>
                <MainContainer>

                    {/* Hidden form */}
                    <Hide hidden={hidden}>
                        <WordForm format="half" />
                    </Hide>

                    {/* Header and word panel */}
                    <WordsPanel history={history} openForm={onCreate} />

                    {/* Word List */}
                    <ListContainer flex>
                        {
                            wordList.map(word => (
                                <WordItem
                                    key={word._id}
                                    word={word}
                                    onEdit={() => onEdit(word)}
                                    onDelete={() => onDelete(word._id)}
                                />
                            ))
                        }
                    </ListContainer>

                </MainContainer>
            </ScrollContainer>

            {/* Slide Form */}
            <Slide>
                <WordForm format="full" />
            </Slide>
        </Container>
    )
}

const mapStateToProps = state => ({
    wordList: wordlistSelector(state),
    activeList: state.lists.activeList
})

export default connect(mapStateToProps, { displayList, getLists, getWords, openEdit, openCreate, openSlide, deleteWord })(Words);
