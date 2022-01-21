import React from 'react';
import Searchbar from 'components/elements/Searchbar';
import Card from 'components/elements/Card';
import Button from 'components/elements/Button';
import { Plus } from 'react-feather'; 


function VocabularyPanel({ openForm, count, loading }) {



    return (
        <Card type="panel" radius="medium">
            <div className="panel-card_group">
                <h1 className="panel-card_group--title">{ !loading ? count : '' } Words</h1>
                <Button id="add-list-btn" type="transparent" onClick={openForm}><Plus color="#eebf3d" size={14} /><span>Add List</span></Button>
            </div>
            <Searchbar />
        </Card>
    )
}

export default VocabularyPanel;
 