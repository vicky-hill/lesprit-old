import React, { useState, useEffect, createRef } from 'react'

import Form from 'components/elements/Form'
import Card from 'components/elements/Card'
import MainContainer from 'components/containers/MainContainer'
import { FormContainer, Heading, Input, SubmitButton } from 'components/elements/Form'

import { connect } from 'react-redux'
import { saveWord, updateWord } from 'actions/words';
import { closeSlide, closeHide } from 'actions/utils'

import validate from 'validation/validate';
import { wordForm as schema } from 'validation/schemas'



const WordForm = ({ saveWord, languages, list, format, formData, mode, updateWord, id, closeSlide, closeHide, hide }) => {

    const [form, setForm] = useState({
        foreign: '',
        native: '',
    })


    useEffect(() => {
        if(hide) {
            refInput.current.focus();
        }
    }, [hide])

    const refInput = createRef();

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 

    const foreignLanguage = capitalize(languages[0].foreign);
    const nativeLanguage = capitalize(languages[0].native);

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

        if (mode === 'edit') {
            updateWord(id, { ...form });
            closeSlide();
        } else {
            saveWord({ ...form, list: list._id });
        }

        setForm({
            foreign: '',
            native: ''
        })

        refInput.current.focus();
    }

    const onClose = () => {
        closeSlide();
        closeHide();
    }

    const formComponent = (
        <>
            <FormContainer format="half">
                <Form onSubmit={onSubmit} id={ mode === 'create' ? 'new-word-form' : 'edit-word-form'} >
                    <Heading>{ mode === 'create' ? 'Add new word:' : 'Update word'}</Heading>

                    <Input validation={validation.foreign} placeholder={foreignLanguage} name="foreign" value={foreign} onChange={onChange} ref={refInput} />
                    <Input validation={validation.native} placeholder={nativeLanguage} name="native" value={native} onChange={onChange} />

                    <SubmitButton title="Save word" />
                </Form>
            </FormContainer>
            
            <i className="fas fa-times closing-x" id="closing-x" onClick={onClose}></i>
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
    id: state.words.form.id,
    hide: state.utils.hide,
    languages: state.auth.user.languages
})

export default connect(mapStateToProps, { saveWord, updateWord, closeSlide, closeHide })(WordForm);

