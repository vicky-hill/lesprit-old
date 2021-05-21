import React, { useState } from 'react';
import Card from '../elements/Card';
import ScrollContainer from '../layout/ScrollContainer';
import Container from '../layout/Container';
import MainContent from '../layout/MainContent';
import VocabularyPanel from '../blocks/vocabulary/VocabularyPanel';
import VocabularyItem from '../blocks/vocabulary/VocabularyItem';
import WordsPanel from '../blocks/words/WordsPanel';
import Hide from '../elements/Hide';
import ListContainer from '../layout/ListContainer';
import WordItem from '../blocks/words/WordItem';

function Vocabulary() {
    const [hidden, setHidden] = useState(true);

    function openForm() {
        setHidden(false);
    }

    function closeForm() {
        setHidden(true)
    }

    return (
        <Container>
            <ScrollContainer>
                <MainContent>

                    {/* Hidden form */}
                    <Hide hidden={hidden}>
                        <Card type="stitched">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, odit.</p>
                            <i onClick={closeForm} className="fas fa-times closing-x"></i>
                        </Card>
                    </Hide>

                    {/* Header and vocabulary panel */}
                    <VocabularyPanel openForm={openForm} />

                    {/* Vocabulary List */}
                    <ListContainer>
                        <VocabularyItem />
                        <VocabularyItem />
                    </ListContainer>

                    {/* Header and word panel */}
                    <WordsPanel openForm={openForm} />

                    {/* Word List */}
                    <ListContainer flex>
                        <WordItem />
                        <WordItem />
                        <WordItem />
                        <WordItem />
                    </ListContainer>
                </MainContent>
            </ScrollContainer>
        </Container>
    )
}

export default Vocabulary;