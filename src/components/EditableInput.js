import React, { useCallback, useState } from 'react';
import { Input, InputGroup, Message, toaster } from 'rsuite';
import { Check, Close, Edit } from '@rsuite/icons';

const EditableInput = ({
    initialValue,
    onSave,
    label = null,
    placeholder = "Write your name",
    emptyMsg = "Input is empty",
    ...inputProps
}) => {

    const [input, setInput] = useState(initialValue)
    const [isEditable, setIsEditable] = useState(false)

    const onInputChange = useCallback((value) => {
        setInput(value)
    }, [])

    const onEditClick = useCallback(() => {
        setIsEditable(p => !p)
        setInput(initialValue)
    }, [initialValue])

    const onSaveClick = async () => {
        const trimmed = input.trim()

        if (trimmed === '') {
            toaster.push(<Message showIcon type="error">{emptyMsg}</Message>, {
                placement: 'topCenter',
                duration: 4000
            });
            return
        }

        if (trimmed !== initialValue) {
            await onSave(trimmed)
        }

        setIsEditable(false)
    }

    return (
        <div>
            {label}
            <InputGroup>
                <Input 
                    {...inputProps} 
                    disabled={!isEditable}
                    placeholder={placeholder} 
                    value={input} 
                    onChange={onInputChange}/>
                
                <InputGroup.Button onClick={onEditClick}>
                    {isEditable ? <Close/> : <Edit/>}
                </InputGroup.Button>

                {
                    isEditable && 
                    <InputGroup.Button onClick={onSaveClick}>
                        <Check/>
                    </InputGroup.Button>
                }
            </InputGroup>
        </div>
    )
};

export default EditableInput;
