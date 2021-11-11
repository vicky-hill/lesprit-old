import React, { useState, useEffect } from 'react'

import Form from 'components/elements/Form'
import Card from 'components/elements/Card'
import MainContainer from 'components/containers/MainContainer'
import { FormContainer, Heading, Input, SubmitButton } from 'components/elements/Form'

import { connect } from 'react-redux'
import { saveWord, updateWord } from 'actions/words';
import { closeSlide } from 'actions/utils' 

import validate from 'validation/validate';
import { wordForm as schema } from 'validation/schemas'


const WordForm = ({ saveWord, list, format, formData, mode, updateWord, id, closeSlide }) => {

    const [form, setForm] = useState({
        foreign: '',
        native: '',
    })

    // Load edit data from state
    useEffect(() => {
        setForm({
            foreign: formData.foreign,
            native: formData.native,
        });
    }, [formData])

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

        if(mode === 'edit') {
            updateWord(id, { ...form });
            closeSlide();
        } else {
            saveWord({ ...form, list: list._id });
        }
        
        setForm({
            foreign: '',
            native: ''
        })
    }

    const formComponent = (
        <>
            <FormContainer format="half">
                <Form onSubmit={onSubmit} id={ mode === 'create' ? 'new-word-form' : 'edit-word-form'} >
                    <Heading>{ mode === 'create' ? 'Add new word:' : 'Update word'}</Heading>
                    <Input validation={validation.foreign} placeholder="Foreign" name="foreign" value={foreign} onChange={onChange} />
                    <Input validation={validation.native} placeholder="Native" name="native" value={native} onChange={onChange} />
                    <SubmitButton title="Save word" />
                </Form>
            </FormContainer>
            <i className="fas fa-times closing-x" id="closing-x" onClick={closeSlide}></i>
        </>
    )

    const halfScreenForm = (
        <Card type="stitched">
            {formComponent}
        </Card>
    )

    const fullScreenForm = (
        <MainContainer>
            <Card type="stitched">
                {formComponent}
            </Card>
        </MainContainer>
    )

    return (
        format === 'half' ? halfScreenForm : fullScreenForm
    )
}

const mapStateToProps = state => ({
    list: state.lists.activeList,
    formData: state.words.form.data,
    mode: state.words.form.mode,
    id: state.words.form.id
})

export default connect(mapStateToProps, { saveWord, updateWord, closeSlide })(WordForm);
