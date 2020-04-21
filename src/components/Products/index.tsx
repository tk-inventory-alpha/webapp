import React, { useEffect } from 'react';
import styled from 'styled-components';

import ProductList from "../ProductList";
import { useDispatch } from "react-redux";
import { retrieveProductsAsync } from "../../features/productSlice";

const Container = styled.div`

`;

const Products = () => {
    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(retrieveProductsAsync())
        },
        []
    );

    return (
        <Container>
            <ProductList/>
        </Container>
    );
}

export default Products;
