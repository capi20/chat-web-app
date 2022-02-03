import React, { useState } from 'react';
import { useModalState } from '../../misc/custom-hooks';
import { Button, Message, Modal, toaster } from 'rsuite';
import AvatarEditor from 'react-avatar-editor'

const fileInputTypes = ".png, .jpeg, .jpg"

const acceptFileTypes = ['image/png', 'image/jpeg', 'image/pjpeg']
const isValidFile = file => acceptFileTypes.includes(file.type)

const AvatarUploadBtn = () => {
    const {isOpen, open, close} = useModalState()

    const [img, setImg] = useState(null)

    const onFileInputChange = (ev) => {
        const currFiles = ev.target.files

        if (currFiles.length === 1) {
            const file = currFiles[0]

            if (isValidFile(file)) {
                setImg(file)
                open()
            } else {
                toaster.push(<Message showIcon type="error">{`Wrong input file: ${file.type}`}</Message>, {
                    placement: 'topCenter',
                    duration: 4000
                });
            }
        }
    }

    return (
        <div className='mt-3 text-center'>
            <div>
                <label htmlFor='avatar-upload' className='d-block cursor-pointer padded'>
                    Select new avatar
                    <input 
                        id="avatar-upload" 
                        type="file" 
                        className="d-none" 
                        accept={fileInputTypes}
                        onChange={onFileInputChange}/>
                </label>

                <Modal open={isOpen} onClose={close}>
                    <Modal.Header>
                        <Modal.Title>
                            Adjust and upload new avatar
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex justify-content-center align-itmes-center h-100">
                            {img && 
                            <AvatarEditor
                                image={img}
                                width={200}
                                height={200}
                                border={10}
                                borderRadius={100}
                                rotate={0}
                            />}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button block appearance='ghost'>
                            Upload new avatar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
};

export default AvatarUploadBtn;
