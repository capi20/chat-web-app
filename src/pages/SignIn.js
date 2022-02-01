import React from 'react';
import firebase from 'firebase/compat/app'
import { Button, Col, Container, Grid, Message, Panel, Row } from 'rsuite';
import {auth, database} from '../misc/firebase'

function SignIn() {

    const signInWithProvider = async provider => {
        
        try {
            const { additionalUserInfo, user} = await auth.signInWithPopup(provider)

            if (additionalUserInfo.isNewUser) {
                await database.ref(`/profiles/${user.uid}`).set({
                    name: user.displayName,
                    createdAt: firebase.database.ServerValue.TIMESTAMP
                })
            }
            <Message showIcon type="success" header="Signed In"/>
        } catch(err) {
            <Message showIcon type="error" header="Error">
                {err.message}
            </Message>
        }
    }

    const onFacebookSignIn = () => {
        signInWithProvider(new firebase.auth.FacebookAuthProvider())
    }

    const onGoogleSignIn = () => {
        signInWithProvider(new firebase.auth.GoogleAuthProvider())
    }
    
    return (
        <Container>
            <Grid className='mt-page'>
                <Row>
                    <Col xs={24} md={12} mdOffset={6}>
                        <Panel>
                            <div className='text-center'>
                                <h2>Welcome to Chat</h2>
                                <p>Progressive chat platform</p>    
                            </div>  
                            <div className='mt-3'>
                                <Button block color="blue" appearance="primary" onClick={onFacebookSignIn}>
                                    Continue with Facebook
                                </Button>
                                <Button block color="green" appearance="primary" onClick={onGoogleSignIn}>
                                    Continue with Google
                                </Button>
                            </div>            
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        </Container>
    )
}

export default SignIn;
