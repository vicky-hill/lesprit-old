import React, { useState } from 'react';
import Card from '../elements/Card';
import ScrollContainer from '../layout/ScrollContainer';
import Container from '../layout/Container';
import MainContent from '../layout/MainContent';
import WordsPanel from '../blocks/WordsPanel';
import VocabularyPanel from '../blocks/VocabularyPanel';
import Hide from '../elements/Hide';

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
                    <Hide hidden={hidden}>
                        <Card type="stitched">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, odit.</p>
                            <i onClick={closeForm} className="fas fa-times closing-x"></i>
                        </Card>
                    </Hide>

                    
                    
                    <VocabularyPanel openForm={openForm} />
                    <WordsPanel openForm={openForm} />
                </MainContent>
            </ScrollContainer>
        </Container>
    )
}

export default Vocabulary;