import React from 'react';
import { useParams } from 'react-router';
import { Button, Drawer, Message, toaster } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room.context';
import { useMediaQuery, useModalState } from '../../../misc/custom-hooks';
import { database } from '../../../misc/firebase';
import EditableInput from '../../EditableInput';

const EditRoomBtnDrawer = () => {
    const {isOpen, open, close} = useModalState()
    const {chatId} = useParams()
    const isMobile = useMediaQuery('(max-width: 992px)')

    const name = useCurrentRoom(v => v.name)
    const description = useCurrentRoom(v => v.description)

    const updateData = (key, value) => {
        database.ref(`rooms/${chatId}`).child(key).set(value).then(() => {
            toaster.push(<Message showIcon type="success">Successfully updated</Message>, {
                placement: 'topCenter',
                duration: 4000
            });
        }).catch(err => {
            toaster.push(<Message showIcon type="error">{err.message}</Message>, {
                placement: 'topCenter',
                duration: 4000
            });
        })
    }

    const onNameSave = (newName) => {
        updateData('name', newName)
    }

    const onDescriptionSave = (newDesc) => {
        updateData('description', newDesc)
    }

    return (
        <div>
            <Button className="br-circle" size="sm" appearance="primary" color="red" onClick={open}>
                A
            </Button>

            <Drawer full={isMobile} open={isOpen} onClose={close} placement="right">
                <Drawer.Header>
                    <Drawer.Title>
                        Edit Room
                    </Drawer.Title>
                    <Drawer.Actions>
                        <Button block appearance="primary" onClick={close}>
                            Close
                        </Button>
                    </Drawer.Actions>
                </Drawer.Header>
                <Drawer.Body>
                    <EditableInput
                        initialValue={name}
                        onSave={onNameSave}
                        label={<h6 className="mb-2">Name</h6>}
                        emptyMsg="Name can not be empty"/>
                    <EditableInput
                        initialValue={description}
                        onSave={onDescriptionSave}
                        label={<h6 className="mb-2">Description</h6>}
                        emptyMsg="Description can not be empty"
                        wrapperClass="mt-3"/>
                </Drawer.Body>
            </Drawer>
        </div>
    )
};

export default EditRoomBtnDrawer;
