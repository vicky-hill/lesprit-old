import React, { useState, useEffect } from 'react';

import Container from 'components/containers/Container';
import ScrollContainer from 'components/containers/ScrollContainer';
import MainContainer from 'components/containers/MainContainer';
import ListContainer from 'components/containers/ListContainer';

import VocabularyPanel from 'components/vocabulary/VocabularyPanel';
import VocabularyItem from 'components/vocabulary/VocabularyItem';
import VocabularyForm from 'components/vocabulary/VocabularyForm';

import Hide from 'components/elements/Hide';
// import { hideByClick } from 'components/elements/Hide';

import { connect } from 'react-redux';
import { getLists } from 'actions/lists';
import { getWords } from 'actions/words'



function Vocabulary({ getLists, getWords, count, lists, loading }) {
    useEffect(() => {
        getLists();
        getWords();
        // eslint-disable-next-line
    }, [])

    // const [hidden, setHidden] = useState(true);    // Half screen form

    // hideByClick(setHidden, 'closing-x');

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
                                <VocabularyPanel count={count} openForm={() => console.log(false)} />

                                {/* Vocabulary List */}
                                <ListContainer >
                                    {
                                        lists.map(list => (
                                            <VocabularyItem key={list._id} title={list.title} slug={list.slug} />
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
    loading: state.lists.loading
})

const mapDispatchToProps = {
    getLists, getWords
}


export default connect(mapStateToProps, mapDispatchToProps)(Vocabulary);



