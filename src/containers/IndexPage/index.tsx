import React from 'react';
import styled from 'styled-components';

import Page from '../../components/Page';
import LogInOrRegister from "../../components/LoginOrRegister";

const Container = styled.div`

`;

const Message = styled.article`
  text-align: center;
  max-width: 20rem;
  margin: 2rem auto;
`;

const IndexPage = () => (
    <Page>
        <Container>
            <Message className="message">
                <div className="message-body">
                    This app makes it easy to keep track of your household inventory.
                    <br />
                    <br />
                    Sign up and start tracking <strong>today!</strong>
                </div>
            </Message>
            <LogInOrRegister />
        </Container>
    </Page>
);

export default IndexPage;
