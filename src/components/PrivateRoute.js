import React from 'react';
import { Redirect } from 'react-router';
import { useProfile } from '../context/profile.context';
import { Container, Loader } from 'rsuite';

function PrivateRoute({ children, ...routeProps}) {
    const {isLoading, profile} = useProfile()

    if (isLoading && !profile) {
        return (
            <Container>
                <Loader center vertical size="md" content="Loading" speed="slow"/>
            </Container>
        )
    } 

    if (!isLoading && !profile) {
        return <Redirect to="/signin"/>
    }

    return (
        <>
            {children}
        </>
    )
}

export default PrivateRoute;
