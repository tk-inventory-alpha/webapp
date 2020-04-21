import React from 'react';
import styled from 'styled-components';

import LoginOrRegisterForm from '../LoginOrRegisterForm';

const Container = styled.div`
  max-width: 20rem;
  margin: 2rem auto;

  h2 {
    margin-bottom: 1rem;
  }
`;

const LogInOrRegister = () => {
    return (
        <Container className="box has-text-centered">
            <h2 className="is-size-4">
                Get Started
            </h2>

            <LoginOrRegisterForm />
        </Container>
    );
};

export default LogInOrRegister;
