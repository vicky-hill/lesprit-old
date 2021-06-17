import React from 'react';
import MainContainer from '../../layout/MainContainer';
import Card from '../../elements/Card';
import Form from '../../elements/Form';
import { FormContainer, Heading, Input, SubmitButton } from '../../elements/Form';


/* Props
=================================================== */
// format: String  | half, full
// heading: String
// submit: String
// inputs: Array | [{ placeholder: String, value: useState, onChange: Function}]


const EditForm = ({ format, heading, submit, inputs }) => {

    const form = (
        <>
            <FormContainer format={format}>
                <Form>
                    <Heading>{heading}</Heading>
                    {
                        inputs && inputs.map((input, index) => (
                            <Input key={index} placeholder={input.placeholder} />
                        ))
                    }
                    <SubmitButton title={submit} />
                </Form>
            </FormContainer>
            <i className="fas fa-times closing-x" id="closing-x"></i>
        </>
    )

    const halfScreenForm = (
        <Card type="stitched">
            { form}
        </Card>
    )

    const fullScreenForm = (
        <MainContainer>
            <Card type="stitched">
                {form}
            </Card>
        </MainContainer>
    )

    return (
        format === 'half' ? halfScreenForm : fullScreenForm
    )
}




export default EditForm;
