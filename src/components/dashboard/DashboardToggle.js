import React from 'react';
import { Button, Drawer } from 'rsuite';
import Dashboard from '.';
import { useMediaQuery, useModalState } from '../../misc/custom-hooks';

const DashboardToggle = () => {
    const { isOpen, open, close } = useModalState() 
    const isMobile = useMediaQuery('(max-width: 992px)')

    return (
        <>
            <Button block color="blue" appearance="primary" onClick={open}>
                Dashboard
            </Button>
            <Drawer full={isMobile} open={isOpen} onClose={close} placement="left">
                <Dashboard/>
            </Drawer>
        </>
    )
};

export default DashboardToggle;