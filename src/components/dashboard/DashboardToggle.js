import React, { useCallback } from 'react';
import { Drawer, Message, toaster } from 'rsuite';
import Dashboard from '.';
import { useMediaQuery, useModalState } from '../../misc/custom-hooks';
import { auth, database } from '../../misc/firebase';
import { isOfflineForDatabase, useProfile } from '../../context/profile.context';
import ProfileAvatar from './ProfileAvatar';

const DashboardToggle = () => {
    const { isOpen, open, close } = useModalState() 
    const isMobile = useMediaQuery('(max-width: 992px)')

    const { profile } = useProfile()

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
            {/* <Button block color="blue" appearance="primary" onClick={open}>
                <DashboardIcon/> Dashboard
            </Button> */}
            <ProfileAvatar 
                src={profile.avatar} 
                name={profile.name} 
                size="lg" 
                onClick={open}
                className="cursor-pointer d-inline-block"/>
            <Drawer full={isMobile} open={isOpen} onClose={close} placement="left">
                <Dashboard onSignOut={onSignOut}/>
            </Drawer>
        </>
    )
};

export default DashboardToggle;