import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as yup from 'yup';
import classNames from 'classnames';
import { useDispatch } from "react-redux";

import * as ProductService from '../../services/product';
import { Product, addProduct } from "../../features/productSlice";

const validationSchema = yup.object().shape({
    stocked: yup.boolean()
        .required(),
    name: yup.string()
        .required('Required')
        .min(2, 'Minimum 2 characters')
        .max(128, 'Maximum 128 characters')
})

const Container = styled.div`
  width: 100%;
`;

type FormValues = {
    stocked: 'false' | 'true';
    name: string;
}

const AddProduct = () => {
    const dispatch = useDispatch();

    const handleSubmit = useCallback(
        async ({name, stocked}: FormValues, helpers: FormikHelpers<FormValues>) => {
            helpers.setSubmitting(true);

            const product: Product = await ProductService.create(name, stocked === 'true');

            dispatch(addProduct(product));

            helpers.setSubmitting(false);
        },
        []
    );

    return (
        <Container>
            <Formik initialValues={{ stocked: 'true', name: '' }}
                    isInitialValid={false}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}>
                {
                    ({ touched, errors, isValid }) => (
                        <Form>
                            <div
                                className={classNames('field', 'has-addons', { 'has-tooltip-active has-tooltip-danger': touched.name && errors.name })}
                                {...(errors.name && touched.name ? { 'data-tooltip': errors.name } : {})}>
                                <p className="control">
                                    <span className="select">
                                        <Field name="stocked"
                                               as="select">
                                            <option value="true">Stocked</option>
                                            <option value="false">Needed</option>
                                        </Field>
                                    </span>
                                </p>
                                <p className="control is-expanded">
                                    <Field className={classNames('input', { 'is-danger': touched.name && errors.name })}
                                           type="text"
                                           name="name"
                                           placeholder="Product name"/>
                                </p>
                                <p className="control">
                                    <button className="button is-primary"
                                            disabled={!isValid}>
                                        Add
                                    </button>
                                </p>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </Container>
    );
};

export default AddProduct;
