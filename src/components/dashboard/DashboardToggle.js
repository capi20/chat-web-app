import React, { useCallback } from 'react';
import { Button, Drawer, Message, toaster } from 'rsuite';
import Dashboard from '.';
import { useMediaQuery, useModalState } from '../../misc/custom-hooks';
import { auth, database } from '../../misc/firebase';
import DashboardIcon from '@rsuite/icons/Dashboard';
import { isOfflineForDatabase } from '../../context/profile.context';

const DashboardToggle = () => {
    const { isOpen, open, close } = useModalState() 
    const isMobile = useMediaQuery('(max-width: 992px)')

    const onSignOut = useCallback(() => {
        database.ref(`/status/${auth.currentUser.uid}`).set(isOfflineForDatabase).then(() => {
            auth.signOut()

            toaster.push(<Message showIcon type="info">Signed out</Message>, {
                placement: 'topCenter',
                duration: 4000
            });
    
            close()
        }).catch(err => {
            toaster.push(<Message showIcon type="error">{err.message}</Message>, {
                placement: 'topCenter',
                duration: 4000
            });
        })

    }, [close])

    return (
        <>
            <Button block color="blue" appearance="primary" onClick={open}>
                <DashboardIcon/> Dashboard
            </Button>
            <Drawer full={isMobile} open={isOpen} onClose={close} placement="left">
                <Dashboard onSignOut={onSignOut}/>
            </Drawer>
        </>
    )
};

export default DashboardToggle;