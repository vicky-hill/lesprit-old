import React, { useState, useEffect } from 'react';
import pineapple from '../../assets/graphics/pineapple.png';

import ScrollContainer from '../layout/ScrollContainer';
import AuthContainer from '../layout/AuthContainer';
import Card from '../elements/Card';
import Alert from 'components/elements/Alert';
import Form, { Heading, Input, SubmitButton} from '../elements/Form';

import { connect } from 'react-redux';
import { register, getUser } from 'actions/auth';
import { setError } from 'actions/alerts';


function Register(props) {
    const { history } = props;

    // actions
    const { register, getUser, setError } = props;
    
    // mapStateToProps
    const { isAuthenticated, error } = props;


    // Check if there's a user to load
    useEffect(() => {
        getUser();
    
    }, [getUser]);

    // If authenticated, redirect to home
    useEffect(() => {
        if (isAuthenticated) {
          history.push('/');
        }
    }, [isAuthenticated, history])

    // Form Data
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        password2: ''
    });

    const { name, password, password2 } = formData;

    // OnChange
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // OnSubmit
    const onSubmit = async e => {
        e.preventDefault();
        
        if(name === '' || password === '' || password2 === '') {
            return setError('Please fill out all fields');
        }

        if(password !== password2 ) {
            return setError('Passwords don\'t match');
        }

        register(name, password);       
        setFormData({ name: '', password: '', password2: '' })
    }


    return (
        <ScrollContainer>
            <AuthContainer>
                <Card type="auth">
                <img className="auth-icon" src={pineapple} alt="pineapple" />
                <Heading>Create a new account</Heading>
                    { error && <Alert message={error} type='danger' /> }
                    <Form onSubmit={onSubmit}>
                        <Input name="name" placeholder="Username" value={name} onChange={onChange} />
                        <Input name="password" placeholder="Password" value={password} onChange={onChange} type='password'  />
                        <Input name="password2" placeholder="Confirm Password" value={password2}  onChange={onChange} type='password' />
                        <SubmitButton title="Sign Up" />
                    </Form>
                </Card>
            </AuthContainer>
        </ScrollContainer>
    )
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.alerts.error
})

export default connect(mapStateToProps, { register, getUser, setError })(Register);
