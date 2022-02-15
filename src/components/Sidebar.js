import React, { useEffect, useRef, useState } from 'react';
import CreateRoomBtnModal from './CreateRoomBtnModal';
import DashboardToggle from './dashboard/DashboardToggle'
import ChatRoomList from './rooms/ChatRoomList';

const Sidebar = () => {
    const topSidebarRef = useRef()
    const [height, setHeight] = useState()

    useEffect(() => {
        if (topSidebarRef.current) {
            setHeight(topSidebarRef.current.scrollHeight)
        }
    }, [topSidebarRef])

    return (
        <div className='h-100'>
            <div ref={topSidebarRef} className="height-90 padded br-bottom d-flex justify-content-between align-items-center">
                <DashboardToggle/>
                <CreateRoomBtnModal/>
            </div>
            <ChatRoomList aboveElHeight={height}/>
        </div>
    )
};

export default Sidebar;
