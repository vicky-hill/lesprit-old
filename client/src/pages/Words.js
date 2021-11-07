import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'
import { getLists, displayList } from 'actions/lists'
import { getWords } from 'actions/words'
import wordlistSelector from 'selectors/wordlistSelector'

import Container from 'components/containers/Container';
import ScrollContainer from 'components/containers/ScrollContainer';
import MainContainer from 'components/containers/MainContainer';
import ListContainer from 'components/containers/ListContainer';

import Hide from 'components/elements/Hide';
import Slide from 'components/elements/Slide';
import { closeByClick } from 'components/elements/Slide';
import { hideByClick } from 'components/elements/Hide';

import WordForm from 'components/blocks/words/WordForm';
import WordItem from 'components/blocks/words/WordItem'
import WordsPanel from 'components/blocks/words/WordsPanel';



const Words = ({ displayList, match, wordList, getWords, getLists }) => {
    const [hidden, setHidden] = useState(true);    // Half screen form
     // eslint-disable-next-line
    const [isOpen, setIsOpen] = useState(false);   // Full screen form 

    closeByClick(setIsOpen, 'closing-x');
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

    const onEdit = () => {
        setIsOpen(true);
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
                    <WordsPanel openForm={() => setHidden(false)} />

                    {/* Word List */}
                    <ListContainer flex>
                        {
                            wordList.map(word => (
                                <WordItem key={word._id} word={word} onEdit={onEdit} />
                            ))
                        }
                    </ListContainer>

                </MainContainer>
            </ScrollContainer>

            {/* Slide Form */}
            <Slide open={isOpen}>
                <WordForm format="full" />
            </Slide>
        </Container>
    )
}

const mapStateToProps = state => ({
    wordList: wordlistSelector(state)
})

export default connect(mapStateToProps, { displayList, getLists, getWords })(Words);

