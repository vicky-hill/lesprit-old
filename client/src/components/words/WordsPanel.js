import React from 'react';
import Button from 'components/elements/Button';
import Card from 'components/elements/Card';
import InputText from 'components/elements/InputText';
import { connect } from 'react-redux'
import { updateList, deleteList } from 'actions/lists';
import { Plus, Trash } from 'react-feather';

import Spinner from 'components/elements/Spinner';


/* Props
=================================================== */
// openForm: Function

function WordsPanel({ openForm, activeList, loading, history, updateList, deleteList, words }) {

    const onSubmit = (title) => {
        updateList(activeList._id, { title })
    }

    const onDelete = () => {
        const c = window.confirm("Delete this list?");

        if (c) {
            deleteList(activeList._id);
            history.push('/vocabulary')
        }
    }

    const getWordCount = (listId) => {
        const wordsInList = words.filter(word => (
            word.list._id === listId
        ))

        return wordsInList.length;
    }

    return (
        loading ? <Spinner /> : (
            <Card type="panel" radius="medium" >
                <div className="panel-card_group">
                    <div className="panel-card_group--bundle">
                        <InputText text={activeList.title} onSubmit={onSubmit} />
                        <p className="panel-card_group--subtitle">{getWordCount(activeList._id)} Words</p>
                    </div>
                </div>
                <div className="panel-card_group higher">
                    <Button type="outline" onClick={openForm}><Plus color="#514F55" size={12} /> <span>Add Words &nbsp; </span></Button>
                    <Button type="outline" onClick={onDelete}><Trash color="#514F55" size={15} /></Button>
                </div>

            </Card >
        )
    )
}

const mapStateToProps = state => ({
    loading: state.lists.loading,
    activeList: state.lists.activeList,
    words: state.words.words
})

export default connect(mapStateToProps, { updateList, deleteList })(WordsPanel);
