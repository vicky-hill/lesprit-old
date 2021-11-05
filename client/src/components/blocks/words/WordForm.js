import React, { useState } from 'react'

import Form from 'components/elements/Form'
import Card from 'components/elements/Card'
import { FormContainer, Heading, Input, SubmitButton } from 'components/elements/Form'

import { connect } from 'react-redux'
import { saveWord } from 'actions/words';

import validate from 'validation/validate';
import { wordForm as schema } from 'validation/schemas'


const WordForm = ({ saveWord, wordList, list }) => {

    const [form, setForm] = useState({
        foreign: '',
        native: ''
    })

    const { foreign, native } = form;

    const [validation, setValidation] = useState({
        foreign: '', native: ''
    })

    const checkValidation = (errors) => {
        const updatedValidation = {}
            
        for (const prop in errors) {
            updatedValidation[prop] = errors[prop]
        }

        return setValidation(updatedValidation)
    }    
    

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    
    const onSubmit = (e) => {
        e.preventDefault();

        const errors = validate(form, schema);
        
        if (errors) {
            return checkValidation(errors);
        };
    
        saveWord({ ...form, list: list._id});
        
        setForm({
            title: ''
        })

        setValidation({
            title: ''
        })
    }

    return (
        <Card type="stitched">
            <FormContainer format="half">
                <Form onSubmit={onSubmit} id="word-form" >
                    <Heading>Add new word:</Heading>
                        <Input validation={validation.foreign} placeholder="Foreign" name="foreign" value={foreign} onChange={onChange} />
                        <Input validation={validation.native} placeholder="Native" name="native" value={native} onChange={onChange} />
                        <SubmitButton title="Save word" />
                </Form>
            </FormContainer>
            <i className="fas fa-times closing-x" id="closing-x"></i>
        </Card>
    )
}

const mapStateToProps = state => ({
    list: state.lists.displayList
})

export default connect(mapStateToProps, { saveWord })(WordForm);

