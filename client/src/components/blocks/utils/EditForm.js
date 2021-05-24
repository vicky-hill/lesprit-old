import React from 'react';
import MainContent from '../../layout/MainContent';
import Card from '../../elements/Card';
import Form from '../../elements/Form';
import { Heading, Input, SubmitButton } from '../../elements/Form';


/* Props
=================================================== */
// format: String  | half, full
// heading: String
// submit: String
// inputs: Array | [{ placeholder: String, value: useState, onChange: Function}]


const EditForm = ({ format, heading, submit, inputs }) => {


    const form = (
        <>
            <Form format={format}>
                <Heading>{heading}</Heading>
                {
                    inputs && inputs.map((input, index) => (
                        <Input key={index} placeholder={input.placeholder} />
                    ))
                }
                <SubmitButton title={submit} />
            </Form>
            <i className="fas fa-times closing-x" id="closing-x"></i>
        </>
    )

    const halfScreenForm = (
        <Card type="stitched">
            { form}
        </Card>
    )

    const fullScreenForm = (
        <MainContent>
            <Card type="stitched">
                {form}
            </Card>
        </MainContent>
    )

    return (
        format === 'half' ? halfScreenForm : fullScreenForm
    )
}




export default EditForm;
