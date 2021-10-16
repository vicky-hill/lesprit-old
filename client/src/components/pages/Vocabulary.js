import React, { useState, useEffect } from 'react';
import ScrollContainer from '../layout/ScrollContainer';
import Container from '../layout/Container';
import MainContainer from '../layout/MainContainer';
import VocabularyPanel from '../blocks/vocabulary/VocabularyPanel';
import VocabularyItem from '../blocks/vocabulary/VocabularyItem';
import WordsPanel from '../blocks/words/WordsPanel';
import Hide from '../elements/Hide';
import ListContainer from '../layout/ListContainer';
import WordItem from '../blocks/words/WordItem';
import { closeByClick } from '../elements/Slide';
import { hideByClick } from '../elements/Hide';
import Slide from '../elements/Slide';
import EditForm from '../blocks/utils/EditForm';

import { connect } from 'react-redux';
import { getLists } from 'actions/lists';
import { getWords } from 'actions/words'

function Vocabulary({ getLists, getWords, count, lists }) {

    useEffect(() => {
        getLists();
        getWords();
    })

    const [hidden, setHidden] = useState(true);    // Half screen form
    const [isOpen, setIsOpen] = useState(false);   // Full screen form 

    closeByClick(setIsOpen, 'closing-x');
    hideByClick(setHidden, 'closing-x');


    return (
        <Container>
            <ScrollContainer>
                <MainContainer>

                    {/* Hidden form */}
                    <Hide hidden={hidden}>
                        <EditForm format="half" heading="Add new list:" submit="Save list" inputs={[{ placeholder: "List name", value: "" }]} />
                    </Hide>

                    {/* Header and vocabulary panel */}
                    <VocabularyPanel count={count} openForm={() => setHidden(false)} />

                    {/* Vocabulary List */}
                    <ListContainer>
                        {
                            lists.map(list => (
                                <VocabularyItem key={list._id} title={list.title} />
                            ))
                        }


                    </ListContainer>









                    {/* Header and word panel */}
                    <WordsPanel openForm={() => setHidden(false)} />

                    {/* Word List */}
                    <ListContainer flex>
                        <WordItem onEdit={() => setIsOpen(true)} />
                        <WordItem onEdit={() => setIsOpen(true)} />
                        <WordItem onEdit={() => setIsOpen(true)} />
                        <WordItem onEdit={() => setIsOpen(true)} />
                    </ListContainer>

                </MainContainer>
            </ScrollContainer>

            {/* Slide Form */}
            <Slide open={isOpen}>
                <EditForm format="full" heading="Add new word:" submit="Save word" inputs={[{ placeholder: "Spanish", value: "" }, { placeholder: "English", value: "" }]} />
            </Slide>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    count: state.words.all.length,
    lists: state.lists.all
})

const mapDispatchToProps = {
    getLists, getWords
}


export default connect(mapStateToProps, mapDispatchToProps)(Vocabulary);