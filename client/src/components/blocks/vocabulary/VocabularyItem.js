import React from 'react';
import Card from '../../elements/Card';

function VocabularyItem() {
    return (
        <Card type="vocabulary">
            {/* <img className="vocabulary-list_item--art hide-mobile" src={chapterArt01} alt="" /> */}

            <div className="vocabulary-card--text">
                <h3>El Niño Que Vivió</h3>
                <p>70 Words</p>
            </div>


            <div className="vocabulary-card--chevron">
                <i className="fas fa-chevron-right"></i>
            </div>

        </Card>
    )
}

export default VocabularyItem;
