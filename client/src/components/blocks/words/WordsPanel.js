import React from 'react';
import Button from '../../elements/Button';
import Card from '../../elements/Card';
import InputText from '../../elements/InputText';

/* Props
=================================================== */
// openForm: Function

function WordsPanel({ openForm }) {

    return (
        <Card type="panel" radius="medium" >
            <div className="panel-card_group">
                <div className="panel-card_group--bundle">
                    <InputText>El Niño Que Vivió</InputText>
                    <p className="panel-card_group--subtitle">70 Words</p>
                </div>    
            </div>
            <Button type="transparent" onClick={openForm}><p>+</p> Add new Word</Button>
        </Card >
    )
}

export default WordsPanel;