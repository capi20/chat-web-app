import React, { memo } from 'react';
import ProfileAvatar from '../../dashboard/ProfileAvatar';
import TimeAgo from 'timeago-react';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';
import PresenceDot from '../../PresenceDot';
import { useCurrentRoom } from '../../../context/current-room.context';
import { Button } from 'rsuite';
import { auth } from '../../../misc/firebase';
import { useHover, useMediaQuery } from '../../../misc/custom-hooks';
import IconBtnControl from './IconBtnControl';
import ImgBtnModal from './ImgBtnModal';

const renderFileMessage = file => {
    if (file.contentType.includes('image')) {
        return (
            <div className="height-200">
                <ImgBtnModal src={file.url} fileName={file.name}/>
            </div>
        )
    }
    return <a href={file.url}>Download {file.name}</a>
}

const MessageItem = ({message, handleAdmin, handleLike, handleDelete}) => {
    const { author, createdAt, text, file, likes, likeCount } = message

    const [selfRef, isHovered] = useHover()
    const isMobile = useMediaQuery(('(max-width: 992px)'))

    const isAdmin = useCurrentRoom(v => v.isAdmin)
    const admins = useCurrentRoom(v => v.admins)

    const isMsgAuthorAdmin = admins.includes(author.uid)
    const isAuthor = auth.currentUser.uid === author.uid
    const canGrantAdmin = isAdmin && !isAuthor

    const canShowIcons = isMobile || isHovered
    const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid)

    return (
        <li className={`mb-1 mw-70 d-flex align-items-center ${isAuthor ? 'flex-end' : ''}`} ref={selfRef}>
            <div className="pos-rel">
                <ProfileAvatar src={author.avatar} name={author.name} className="ml-1" size="md"/>
                <PresenceDot uid={author.uid}/>
            </div>
            <div className="ml-1 msg-wrapper bg-black-02">
                <div className="d-flex align-items-center justify-content-between font-bolder">
                    <div className="d-flex align-items-center">
                        <ProfileInfoBtnModal profile={author} appearance="link" className="p-0 font-bolder text-black">
                            {canGrantAdmin && (
                                <Button block 
                                    appearance="primary" 
                                    color="blue" 
                                    onClick={() => handleAdmin(author.uid)}>
                                    {isMsgAuthorAdmin 
                                    ? 'Remove admin permission'
                                    : 'Give admin in this room'}
                                </Button>
                            )}
                        </ProfileInfoBtnModal>
                        <TimeAgo 
                            datetime={createdAt} 
                            className="font-normal text-black-45 ml-2"/>
                    </div>

                    <div className="d-flex">
                        <IconBtnControl
                            {...(isLiked ? {color: 'red'} : {})}
                            isVisible={canShowIcons}
                            iconName="heart"
                            tooltip="Like this message"
                            onClick={() => handleLike(message.id)}
                            badgeContent={likeCount}
                        />

                        {isAuthor &&
                            <IconBtnControl
                                isVisible={canShowIcons}
                                iconName="close"
                                tooltip="Delete this message"
                                onClick={() => handleDelete(message.id)}
                            />
                        }
                    </div>
                </div>
                <div className="text-black font-small">
                    {text && <span className="word-break-all">{text}</span>}
                    {file && renderFileMessage(file)}
                </div>
            </div>
        </li>
    )
};

export default memo(MessageItem);
