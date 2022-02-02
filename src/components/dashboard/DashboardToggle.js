import React from 'react';
import { Button, Drawer } from 'rsuite';
import Dashboard from '.';
import { useModalState } from '../../misc/custom-hooks';

const DashboardToggle = () => {
    const { isOpen, open, close } = useModalState() 

    return (
        <>
            <Button block color="blue" appearance="primary" onClick={open}>
                Dashboard
            </Button>
            <Drawer open={isOpen} onClose={close} placement="left">
                <Dashboard/>
            </Drawer>
        </>
    )
};

export default DashboardToggle;