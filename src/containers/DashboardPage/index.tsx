import React from 'react';
import styled from 'styled-components';

import Page from "../../components/Page";
import Products from "../../components/Products";

const Container = styled.div`

`;

const DashboardPage = () => (
    <Page>
        <Container>
            <Products />
        </Container>
    </Page>
);

export default DashboardPage;
