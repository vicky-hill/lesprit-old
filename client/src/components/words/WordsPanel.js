import React from 'react';
import Button from 'components/elements/Button';
import Card from 'components/elements/Card';
import InputText from 'components/elements/InputText';
import { connect } from 'react-redux'
import { updateList } from 'actions/lists';


/* Props
=================================================== */
// openForm: Function

function WordsPanel({ openForm, activeList, loading, history, updateList }) {

    const onSubmit = (title) => {
        updateList(activeList._id, { title })
    }
     
    return (
        loading ? <p>loading</p> : (
            <Card type="panel" radius="medium" >
                <div className="panel-card_group">
                    <div className="panel-card_group--bundle">
                        <InputText text={activeList.title} onSubmit={onSubmit} />
                        <p className="panel-card_group--subtitle">Words</p>
                    </div>
                </div>
                <Button type="transparent" onClick={openForm}><p>+</p> Add new Word</Button>
            </Card >
        )
    )
}

const mapStateToProps = state => ({
    loading: state.lists.loading,
    activeList: state.lists.activeList
})

export default connect(mapStateToProps, { updateList })(WordsPanel);
