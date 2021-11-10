import React from 'react';
import Button from '../../elements/Button';
import Card from '../../elements/Card';
import InputText from '../../elements/InputText';
import { connect } from 'react-redux'


/* Props
=================================================== */
// openForm: Function

function WordsPanel({ openForm, title, loading }) {

    const onSubmit = (title) => {
        console.log(title)
    }
    

    return (
        loading ? <p>loading</p> : (
            <Card type="panel" radius="medium" >
                <div className="panel-card_group">
                    <div className="panel-card_group--bundle">
                        <InputText text={title} onSubmit={onSubmit} />
                        <p className="panel-card_group--subtitle">{ title }</p>
                    </div>
                </div>
                <Button type="transparent" onClick={openForm}><p>+</p> Add new Word</Button>
            </Card >
        )
    )
}

const mapStateToProps = state => ({
    loading: state.lists.loading,
    title: state.lists.activeList.title
})

export default connect(mapStateToProps, {})(WordsPanel);
