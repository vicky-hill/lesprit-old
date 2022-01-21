import React, { useEffect } from 'react';

import Container from 'components/containers/Container';
import ScrollContainer from 'components/containers/ScrollContainer';
import MainContainer from 'components/containers/MainContainer';
import ListContainer from 'components/containers/ListContainer';

import VocabularyPanel from 'components/vocabulary/VocabularyPanel';
import VocabularyItem from 'components/vocabulary/VocabularyItem';
import VocabularyForm from 'components/vocabulary/VocabularyForm';

import WordItem from 'components/words/WordItem';
import Slide from 'components/elements/Slide';
import WordForm from 'components/words/WordForm';


import Hide from 'components/elements/Hide';
import Spinner from 'components/elements/Spinner';

import { connect } from 'react-redux';
import { getLists } from 'actions/lists';
import { getWords } from 'actions/words'
import { openHide } from 'actions/utils';

import searchSelector from 'selectors/searchSelector';



function Vocabulary({ getLists, getWords, count, lists, loadingLists, loadingWords, words, openHide, searchResult }) {

    useEffect(() => {
        getLists();
        getWords();
    }, [])  // eslint-disable-line

    const getWordCount = (listId) => {
        const wordsInList = words.filter(word => (
            word.list._id === listId
        ))

        return wordsInList.length;
    }

    const vocabularyList = (
        <ListContainer >
            {
                lists.map(list => (
                    <VocabularyItem key={list._id} title={list.title} slug={list.slug} count={getWordCount(list._id)} />
                ))
            }
        </ListContainer>
    )

    const wordList = (
        <ListContainer flex>
            {
                searchResult.map(word => (
                    <WordItem
                        key={word._id}
                        word={word}
                    />
                ))
            }
        </ListContainer>
    )

    return (
        <Container>
            <ScrollContainer>
                <MainContainer>

                    {
                        loadingLists || loadingWords ? <Spinner /> : (
                            <>
                                {/* Hidden form */}
                                <Hide>
                                    <VocabularyForm />
                                </Hide>



                                {/* Header and vocabulary panel */}
                                <VocabularyPanel count={count} openForm={openHide} />

                                {searchResult.length ? wordList : vocabularyList}

                            </>
                        )
                    }

                </MainContainer>
            </ScrollContainer>

            {/* Slide Form */}
            <Slide>
                <WordForm format="full" />
            </Slide>
        </Container >
    )
}

const mapStateToProps = (state) => ({
    count: state.words.words.length,
    lists: state.lists.lists,
    loadingLists: state.lists.loading,
    loadingWords: state.words.loading,
    words: state.words.words,
    searchResult: searchSelector(state)
})

export default connect(mapStateToProps, { getLists, getWords, openHide })(Vocabulary);



