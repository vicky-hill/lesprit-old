import React, { useEffect, createRef } from 'react'


import { connect } from 'react-redux'
import { getLists, displayList } from 'actions/lists'
import { getWords, openEdit, openCreate, deleteWord } from 'actions/words'
import { openSlide, openHide } from 'actions/utils';
import wordlistSelector from 'selectors/wordlistSelector'

import Container from 'components/containers/Container';
import ScrollContainer from 'components/containers/ScrollContainer';
import MainContainer from 'components/containers/MainContainer';
import ListContainer from 'components/containers/ListContainer';

import Hide from 'components/elements/Hide';
import Slide from 'components/elements/Slide';

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
    deleteWord,
    openHide
    }) => {


    useEffect(() => {
        loadData();
    }, []) // eslint-disable-line
 
    const loadData = async () => {
        await getWords();
        await getLists();
        await displayList(match.params.title)
    }

    const onCreate = () => {
        openHide();
        openCreate();
    }

    const refInput = createRef();

    return (
        <Container>
            <ScrollContainer>
                <MainContainer>

                    {/* Hidden form */}
                    <Hide>
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
                                />
                            ))
                        }
                    </ListContainer>

                </MainContainer>
            </ScrollContainer>

            {/* Slide Form */}
            <Slide>
                <WordForm refInput={refInput} format="full" />
            </Slide>
        </Container>
    )
}

const mapStateToProps = state => ({
    wordList: wordlistSelector(state),
    activeList: state.lists.activeList
})

export default connect(mapStateToProps, { displayList, getLists, getWords, openEdit, openCreate, openSlide, openHide, deleteWord })(Words);
