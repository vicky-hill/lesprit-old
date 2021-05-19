import React from 'react';
import Searchbar from '../elements/Searchbar';
import Card from '../elements/Card';
import Button from '../elements/Button';

/* Props
=================================================== */
// openForm: Function

function VocabularyPanel({ openForm }) {

    return (
        <Card type="panel" radius="medium">
            <div className="panel-card_group">
                <h1 className="panel-card_group--title">20 Words</h1>
                <Button type="transparent" onClick={openForm}><p>+</p> Add new list</Button>
            </div>
            <Searchbar />
        </Card>
    )
}

export default VocabularyPanel;
