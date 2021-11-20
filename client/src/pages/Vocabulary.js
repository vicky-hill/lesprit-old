import React, { useEffect } from 'react';

import Container from 'components/containers/Container';
import ScrollContainer from 'components/containers/ScrollContainer';
import MainContainer from 'components/containers/MainContainer';
import ListContainer from 'components/containers/ListContainer';

import VocabularyPanel from 'components/vocabulary/VocabularyPanel';
import VocabularyItem from 'components/vocabulary/VocabularyItem';
import VocabularyForm from 'components/vocabulary/VocabularyForm';

import Hide from 'components/elements/Hide';

import { connect } from 'react-redux';
import { getLists } from 'actions/lists';
import { getWords } from 'actions/words'
import { openHide } from 'actions/utils'; 



function Vocabulary({ getLists, getWords, count, lists, loading, words, openHide }) {

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

    return (
        <Container>
            <ScrollContainer>
                <MainContainer>

                    {
                        loading ? <p> Loading...</p> : (
                            <>
                                {/* Hidden form */}
                                <Hide>
                                    <VocabularyForm />
                                </Hide>

                                {/* Header and vocabulary panel */}
                                <VocabularyPanel count={count} openForm={openHide} />

                                {/* Vocabulary List */}
                                <ListContainer >
                                    {
                                        lists.map(list => (
                                            <VocabularyItem key={list._id} title={list.title} slug={list.slug} count={() => getWordCount(list._id)} />
                                        ))
                                    }
                                </ListContainer>

                            </>
                        )
                    }

                </MainContainer>
            </ScrollContainer>
        </Container >
    )
}

const mapStateToProps = (state) => ({
    count: state.words.words.length,
    lists: state.lists.lists,
    loading: state.lists.loading,
    words: state.words.words
})

export default connect(mapStateToProps, { getLists, getWords, openHide })(Vocabulary);



