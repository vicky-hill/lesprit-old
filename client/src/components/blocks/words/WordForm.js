import React, { useState } from 'react'

import Form from 'components/elements/Form'
import Card from 'components/elements/Card'
import MainContainer from 'components/containers/MainContainer'
import { FormContainer, Heading, Input, SubmitButton } from 'components/elements/Form'

import { connect } from 'react-redux'
import { saveWord } from 'actions/words';

import validate from 'validation/validate';
import { wordForm as schema } from 'validation/schemas'


/* Props
=========================================== */
// saveWord: action
// formData: state
// list: state
// format: string | half, full

const WordForm = ({ saveWord, list, format, formData }) => {

    const [form, setForm] = useState({
        foreign: formData.foreign,
        native: formData.native,
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

        saveWord({ ...form, list: list._id });

        setForm({
            foreign: '',
            native: ''
        })
    }

    const formComponent = (
        <>
            <FormContainer format="half">
                <Form onSubmit={onSubmit} id="word-form" >
                    <Heading>Add new word:</Heading>
                    <Input validation={validation.foreign} placeholder="Foreign" name="foreign" value={foreign} onChange={onChange} />
                    <Input validation={validation.native} placeholder="Native" name="native" value={native} onChange={onChange} />
                    <SubmitButton title="Save word" />
                </Form>
            </FormContainer>
            <i className="fas fa-times closing-x" id="closing-x"></i>
        </>
    )

    const halfScreenForm = (
        <Card type="stitched">
            { formComponent }
        </Card>
    )

    const fullScreenForm = (
        <MainContainer>
            <Card type="stitched">
                { formComponent }
            </Card>
        </MainContainer>
    )

    return (
        format === 'half' ? halfScreenForm : fullScreenForm
    )
}

const mapStateToProps = state => ({
    list: state.lists.displayList,
    formData: state.words.form
})

export default connect(mapStateToProps, { saveWord })(WordForm);

