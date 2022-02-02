import React from 'react';
import { Navigate } from 'react-router-dom'
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
        return <Navigate to="/signin"/>
    }

    return (
        <>
            {children}
        </>
    )
}

export default PrivateRoute;
