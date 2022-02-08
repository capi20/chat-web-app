import React from 'react';
import { Button, Divider, Drawer, Message, toaster } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import { database } from '../../misc/firebase';
import { getUserUpdates } from '../../misc/helpers';
import EditableInput from '../EditableInput';
import AvatarUploadBtn from './AvatarUploadBtn';

const Dashboard = ({onSignOut}) => {
    const {profile} = useProfile()

    const onSave = async newData => {
        try {
            const updates = await getUserUpdates(
                profile.uid,
                'name',
                newData,
                database
            )

            console.log(updates)

            await database.ref().update(updates)

            toaster.push(<Message showIcon type="success">Nickname has been updated</Message>, {
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

    return (
        <>
            <Drawer.Header>
                <Drawer.Title>Dashboard</Drawer.Title>
                
                <Drawer.Actions>
                    <Button block color='red' appearance='primary' onClick={onSignOut}>
                        Sign out
                    </Button>
                </Drawer.Actions>
            </Drawer.Header>

            <Drawer.Body>
                <h3>Hey, {profile.name}</h3>
                <Divider/>
                <EditableInput
                    name="nickname"
                    initialValue={profile.name}
                    onSave={onSave}
                    label={<h6 className='mb-2'>Nickname</h6>}
                />
                <AvatarUploadBtn/>
            </Drawer.Body>
        </>
    )
};

export default Dashboard;
