import React, { useState, useEffect, createRef } from 'react'

import Form from 'components/elements/Form'
import Card from 'components/elements/Card'
import MainContainer from 'components/containers/MainContainer'
import { FormContainer, Heading, Input, TextArea, SubmitButton } from 'components/elements/Form'

import { connect } from 'react-redux'
import { saveWord, updateWord } from 'actions/words';
import { closeSlide, closeHide } from 'actions/utils'

import validate from 'validation/validate';
import { wordForm as schema } from 'validation/schemas'
import { PlusCircle, MinusCircle } from 'react-feather';



const WordForm = ({ saveWord, languages, list, format, formData, mode, updateWord, id, closeSlide, closeHide, hide }) => {

    const [form, setForm] = useState({
        foreign: '',
        native: '',
        phrases: []
    })

    useEffect(() => {
        if (hide && mode) {
            refInput.current.focus();
        }
    }, [hide]) // eslint-disable-line

    useEffect(() => {
        return () => {
            onClose();
        }
    }, [])

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
            phrases: formData.phrases
        });

    }, [formData])

    const { foreign, native, phrases } = form;



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

    const onChange = (e, i) => {
        if (e.target.tagName === 'TEXTAREA') {
            let newPhrases = [...phrases];
            newPhrases[i].phrase = e.target.value;
            setForm({
                ...form,
                phrases: newPhrases
            });
        } else {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
        }
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
            native: '',
            phrases: [{
                phrase: '',
                highlight: ''
            }]
        })

        refInput.current.focus();
    }

    const onClose = () => {
        closeSlide();
        closeHide();
    }

    const getHighlight = (i) => {
        const highlight = window.getSelection().toString();

        if (highlight) {
            let newPhrases = [...phrases];
            newPhrases[i].highlight = highlight

            setForm({
                ...form,
                phrases: newPhrases
            });
        }
    }

    // Add Phrase
    const addPhrase = () => {
        setForm({
            ...form,
            phrases: [
                ...phrases,
                { phrase: '', highlight: '' }
            ]
        });
    }

    // Remove Phrase
    const removePhrase = (index) => {
        const updatedPhrases = [...form.phrases];
        updatedPhrases.splice(index, 1);

        setForm({
            ...form,
            phrases: updatedPhrases
        })
    }
    



    const formComponent = (
        <>
            <FormContainer format="half">
                <Form onSubmit={onSubmit} id={mode === 'create' ? 'new-word-form' : 'edit-word-form'} >
                    <Heading>{mode === 'create' ? 'Add new word:' : 'Update word'}</Heading>

                    {/* Foreign input */}
                    <Input
                        validation={validation.foreign}
                        placeholder={foreignLanguage}
                        name="foreign"
                        id="foreign"
                        value={foreign}
                        onChange={onChange}
                        ref={refInput}
                    />

                    {/* Native input */}
                    <Input
                        validation={validation.native}
                        placeholder={nativeLanguage}
                        name="native"
                        id="native"
                        value={native}
                        onChange={onChange}
                    />

                    {/* Phrase textarea */}
                    {
                        !phrases.length ?
                            <div className="add-textarea" onClick={addPhrase}>
                                <PlusCircle size={19} /> <span>Add Phrase</span>
                            </div> :

                            phrases.map((phrase, i) => (
                                <div key={i}>
                                    {
                                        phrases.length === 0 ?
                                            <div className="add-textarea" onClick={addPhrase}>
                                                <PlusCircle size={19} /> <span>Add Phrase</span>
                                            </div> :
                                            <div className='pos-relative'>
                                                <TextArea
                                                    name="phrase"
                                                    id="phrase"
                                                    placeholder="Phrase"
                                                    value={phrases[i].phrase}
                                                    onChange={(e) => onChange(e, i)}
                                                    onMouseUp={() => getHighlight(i)}
                                                    small={phrases[i].highlight && `Highlighted: ${phrases[i].highlight}`}
                                                />
                                                <MinusCircle className='remove-phrase' size={19} onClick={() => removePhrase(i)} />
                                            </div>
                                    }

                                    {
                                        i === phrases.length - 1 && phrases[i].phrase &&
                                        <div className="add-textarea" onClick={addPhrase}>
                                            <PlusCircle size={19} /> <span>Add Phrase</span>
                                        </div>
                                    }


                                </div>
                            ))
                    }


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

