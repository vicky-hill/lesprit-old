import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'

import Container from 'components/containers/Container';
import ScrollContainer from 'components/containers/ScrollContainer';
import MainContainer from 'components/containers/MainContainer';
import ListContainer from 'components/containers/ListContainer';

import Hide from 'components/elements/Hide';
import { closeByClick } from 'components/elements/Slide';
import { hideByClick } from 'components/elements/Hide';

import WordForm from 'components/blocks/words/WordForm';
import WordItem from 'components/blocks/words/WordItem'
import WordsPanel from 'components/blocks/words/WordsPanel';


const Words = () => {
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
                        <WordForm />
                    </Hide>

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
            {/* <Slide open={isOpen}>
                <EditForm format="full" heading="Add new word:" submit="Save word" inputs={[{ placeholder: "Spanish", value: "" }, { placeholder: "English", value: "" }]} />
            </Slide> */}
        </Container>
    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {  })(Words);

