import React, { useCallback, useState } from 'react';
import { Input, InputGroup, Message, toaster } from 'rsuite';
import SendIcon from '@rsuite/icons/Send';
import firebase from 'firebase/compat/app'
import { useParams } from 'react-router';
import { useProfile } from '../../../context/profile.context';
import { database } from '../../../misc/firebase';
import AttachementBtnModal from './AttachementBtnModal';

function assembleMessage(profile, chatId) {
  return {
    roomId: chatId,
    author: {
      name: profile.name,
      uid: profile.uid,
      createdAt: profile.createdAt,
      ...(profile.avatar ? {avatar: profile.avatar} : {})
    },
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    likeCount: 0
  }
}

const Bottom = () => {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {chatId} = useParams()
  const {profile} = useProfile()

  const onInputChange = useCallback((value) => {
    setInput(value)
  }, [])

  const onSendClick = async () => {
    if (input.trim() === '') {
      return
    }

    const msgData = assembleMessage(profile, chatId)
    msgData.text = input

    const updates = {}

    const messageId = database.ref('messages').push().key

    updates[`/messages/${messageId}`] = msgData
    updates[`/rooms/${chatId}/lastMessage`] = {
      ...msgData,
      msgId: messageId
    }

    setIsLoading(true)

    try {
      await database.ref().update(updates)

      setInput('')
      setIsLoading(false)
      
    } catch(err) {
      toaster.push(<Message showIcon type="error">{err.message}</Message>, {
        placement: 'topCenter',
        duration: 4000
      });
      setIsLoading(false)
    }
  }

  const onKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault()
      onSendClick()
    }
  }

  return (
    <div>
      <InputGroup>
        <AttachementBtnModal/>
        <Input 
          placeholder="Write a new message here..." 
          value={input} 
          onChange={onInputChange} 
          onKeyDown={onKeyDown}/>
        <InputGroup.Button 
          color="blue" 
          appearance="primary" 
          onClick={onSendClick}
          disabled={isLoading}>
          <SendIcon/>
        </InputGroup.Button>
      </InputGroup>
    </div>
  )
};

export default Bottom;
