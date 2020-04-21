import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Formik, Form, FormikHelpers, ErrorMessage, Field } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import classNames from "classnames";
import { useDispatch } from "react-redux";

import { login } from '../../features/authSlice';
import * as AuthService from '../../services/auth';

const Container = styled.div`
  .field {
    margin-bottom: 1rem;
  }
`;

type FormValues = {
    email: string;
    password: string;
};

const validationSchema = yup.object().shape({
    email: yup.string()
        .required('Required')
        .email('Must be a valid email address')
        .max(128, 'Maximum 128 characters'),
    password: yup.string()
        .required('Required')
        .min(8, 'Minimum 8 characters')
        .max(32, 'Maximum 32 characters'),

});

const LogInOrRegisterForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = useCallback(
        async ({email, password}: FormValues, helpers: FormikHelpers<FormValues>) => {
            helpers.setSubmitting(true);

            const { token } = await AuthService.loginOrRegister(email, password);

            dispatch(login({ email, token }));

            history.push('/dashboard');
        },
        []
    );

    return (
        <Container>
            <Formik initialValues={{email: '', password: ''}}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}>
                {
                    ({isValid, touched, errors}) => (
                        <Form>
                            <div className="field">
                                <div className="control has-icons-left">
                                    <Field className={classNames('input', {'is-danger': touched.email && errors.email})}
                                           type="email"
                                           name="email"
                                           placeholder="Email address"/>
                                    <span className="icon is-small is-left"><FaEnvelope /></span>
                                </div>

                                <ErrorMessage name="email">
                                    {(message) => (
                                        <p className="help is-danger">
                                            {message}
                                        </p>
                                    )}
                                </ErrorMessage>
                            </div>
                            <div className="field">
                                <div className="control has-icons-left">
                                    <Field className={classNames('input', {'is-danger': touched.password && errors.password})}
                                           type="password"
                                           name="password"
                                           placeholder="Password"/>
                                    <span className="icon is-small is-left"><FaLock /></span>
                                </div>

                                <ErrorMessage name="password">
                                    {(message) => (
                                        <p className="help is-danger">
                                            {message}
                                        </p>
                                    )}
                                </ErrorMessage>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button className="button is-success is-fullwidth"
                                            disabled={!isValid}>
                                        Login or Register
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </Container>
    );
};

export default LogInOrRegisterForm;
