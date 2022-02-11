import React, { useCallback, useRef, useState } from 'react';
import { Button, Form, Input, Message, Modal, Schema, toaster } from 'rsuite';
import firebase from 'firebase/compat/app'
import { useModalState } from '../misc/custom-hooks';
import { auth, database } from '../misc/firebase';

const { StringType } = Schema.Types

const model = Schema.Model({
    name: StringType().isRequired('Chat name is required'),
    description: StringType().isRequired('Description is required')
})

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const INITIAL_FORM = {
    name: '',
    description: ''
}

const CreateRoomBtnModal = () => {

    const {isOpen, open, close} = useModalState()

    const [formValue, setFormValue] = useState(INITIAL_FORM)
    const [isLoading, setIsLoading] = useState(false)
    const formRef = useRef()

    const onFormChange = useCallback((value) => {
        setFormValue(value)
    }, [])

    const onSubmit = async () => {
        if (!formRef.current.check()) {
            return
        }

        setIsLoading(true)

        const newRoomData = {
            ...formValue,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            admins: {
                [auth.currentUser.uid]: true
            }
        }

        try {
            await database.ref('rooms').push(newRoomData)

            toaster.push(<Message showIcon type="success">{`${formValue.name} has been created`}</Message>, {
                placement: 'topCenter',
                duration: 4000
            });

            setIsLoading(false)
            setFormValue(INITIAL_FORM)
            close()

        } catch(err) {
            toaster.push(<Message showIcon type="error">{err.message}</Message>, {
                placement: 'topCenter',
                duration: 4000
            });
        }
    }
    
    return (
        <div className='mt-1'>
            <Button block appearance="primary" color="green" onClick={open}>
                Create new chat room
            </Button>

            <Modal open={isOpen} onClose={close}>
                <Modal.Header>
                    <Modal.Title>New chat room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form fluid onChange={onFormChange} formValue={formValue} model={model} ref={formRef}>
                        <Form.Group>
                            <Form.ControlLabel>Room name</Form.ControlLabel>
                            <Form.Control name="name" placeholder="Enter chat room name..."/>
                        </Form.Group>
                        <Form.Group>
                            <Form.ControlLabel>Description</Form.ControlLabel>
                            <Form.Control accepter={Textarea} rows={5} name="description" placeholder="Enter room description..."/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button block appearance='primary' onClick={onSubmit} disabled={isLoading}>
                        Create new chat room
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};

export default CreateRoomBtnModal;
