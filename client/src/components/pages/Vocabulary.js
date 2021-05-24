import React, { useState } from 'react';
import ScrollContainer from '../layout/ScrollContainer';
import Container from '../layout/Container';
import MainContent from '../layout/MainContent';
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

function Vocabulary() {
    const [hidden, setHidden] = useState(true);    // Half screen form
    const [isOpen, setIsOpen] = useState(false);   // Full screen form 

    closeByClick(setIsOpen, 'closing-x');
    hideByClick(setHidden, 'closing-x');


    return (
        <Container>
            <ScrollContainer>
                <MainContent>

                    {/* Hidden form */}
                    <Hide hidden={hidden}>
                            <EditForm format="half" heading="Add new list:" submit="Save list" inputs={[{ placeholder: "List name", value: "" }]} />
                    </Hide>

                    {/* Header and vocabulary panel */}
                    <VocabularyPanel openForm={() => setHidden(false)} />

                    {/* Vocabulary List */}
                    <ListContainer>
                        <VocabularyItem />
                        <VocabularyItem />
                    </ListContainer>

                    {/* Header and word panel */}
                    <WordsPanel openForm={() => setHidden(false)} />

                    {/* Word List */}
                    <ListContainer flex>
                        <WordItem onEdit={() => setIsOpen(true)} />
                        <WordItem />
                        <WordItem />
                        <WordItem />
                    </ListContainer>

                </MainContent>
            </ScrollContainer>

            {/* Slide Form */}
            <Slide open={isOpen}>
                <EditForm format="full" heading="Add new word:" submit="Save word" inputs={[{ placeholder: "Spanish", value: "" }, { placeholder: "English", value:""}]} />
            </Slide>
        </Container>
    )
}

export default Vocabulary;