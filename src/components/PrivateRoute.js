import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'
import { useProfile } from '../context/profile.context';
import { Container, Loader } from 'rsuite';

function PrivateRoute({...routeProps}) {
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
        <Routes>
            <Route {...routeProps}></Route>
        </Routes>
    )
}

export default PrivateRoute;
