import React, { useState } from 'react'

import Form from 'components/elements/Form'
import Card from 'components/elements/Card'
import { FormContainer, Heading, Input, SubmitButton } from 'components/elements/Form'

import { connect } from 'react-redux'
import { saveList } from 'actions/lists';

import validate from 'validation/validate';
import { vocabularyForm as schema } from 'validation/schemas'


const VocabularyForm = ({ saveList }) => {

    const [form, setForm] = useState({
        title: ''
    })

    const { title } = form;

    const [validation, setValidation] = useState({
        title: ''
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
    
        saveList(form);
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
                <Form onSubmit={onSubmit} id="vocabulary-form" >
                    <Heading>Add new list:</Heading>
                        <Input validation={validation.title} placeholder="List name" name="title" value={title} onChange={onChange} />
                        <SubmitButton title="Save list" />
                </Form>
            </FormContainer>
            <i className="fas fa-times closing-x" id="closing-x"></i>
        </Card>
    )
}


export default connect(null, { saveList })(VocabularyForm);
