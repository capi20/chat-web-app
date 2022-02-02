import React from 'react';
import firebase from 'firebase/compat/app'
import { Button, Col, Container, Grid, Message, Panel, Row, toaster } from 'rsuite';
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
            toaster.push(<Message showIcon type="success">Signed in</Message>, {
                placement: 'topCenter',
                duration: 4000
            });
        } catch(err) {
            toaster.push(<Message showIcon type="error">{err.message}</Message>, {
                placement: 'topCenter',
                duration: 4000
            });
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
