import React from 'react';
import ScrollContainer from '../layout/ScrollContainer';
import AuthContainer from '../layout/AuthContainer';
import Card from '../elements/Card';
import Form, { Heading, Input, SubmitButton} from '../elements/Form';
import pineapple from '../../assets/graphics/pineapple.png';

function Login() {
    return (
        <ScrollContainer>
            <AuthContainer>
                <Card type="auth">
                <img className="auth-icon" src={pineapple} alt="pineapple" />
                <Heading>Sign into your account</Heading>
                    <Form>
                        <Input placeholder="Username" />
                        <Input placeholder="Password" />
                       
                        <SubmitButton title="Log In" />
                    </Form>
                </Card>
            </AuthContainer>

        </ScrollContainer>
    )
}

export default Login;
