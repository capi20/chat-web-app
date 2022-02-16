import React from 'react';
import { useLocation } from 'react-router-dom';
import { Loader, Nav } from 'rsuite'
import { useRooms } from '../../context/rooms.context';
import RoomItem from './RoomItem'

const ChatRoomList = ({ aboveElHeight }) => {

    const rooms = useRooms()

    const location = useLocation()

    console.log(aboveElHeight)

    return (
        <Nav
            appearance="subtle"
            vertical
            reversed
            className="overflow-y-scroll custom-scroll mt-3"
            style={{
                height: `calc(100% - ${aboveElHeight}px - 16px)`
            }}
            activeKey={location.pathname}>
                {!rooms && (
                    <Loader center vertical content="Loading" speed="slow" size="md"/>
                )}
                {rooms && 
                rooms.length > 0 
                && rooms.map((room, i) => {
                    return (
                        <React.Fragment key={i}>
                            <Nav.Item 
                                href={`/chat/${room.id}`}
                                key={room.id} 
                                eventKey={`/chat/${room.id}`}>
                                <RoomItem room={room}/>
                            </Nav.Item>
                            <hr className='m-0 mt-2 mb-2'/>
                        </React.Fragment>
                    )
                })}
        </Nav>
    )
};

export default ChatRoomList;
