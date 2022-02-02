import React, { useCallback } from 'react';
import { Button, Drawer, Message, toaster } from 'rsuite';
import Dashboard from '.';
import { useMediaQuery, useModalState } from '../../misc/custom-hooks';
import { auth } from '../../misc/firebase';
import DashboardIcon from '@rsuite/icons/Dashboard';

const DashboardToggle = () => {
    const { isOpen, open, close } = useModalState() 
    const isMobile = useMediaQuery('(max-width: 992px)')

    const onSignOut = useCallback(() => {
        auth.signOut()

        toaster.push(<Message showIcon type="info">Signed out</Message>, {
            placement: 'topCenter',
            duration: 4000
        });

        close()
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