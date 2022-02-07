import React, { memo } from 'react';
import { useCurrentRoom } from '../../../context/current-room.context';
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import { useMediaQuery } from '../../../misc/custom-hooks';
import { Link } from 'react-router-dom';
import { ButtonToolbar } from 'rsuite';
import RoomInfoBtnModal from './RoomInfoBtnModal'

const Top = () => {
    const name = useCurrentRoom(v => v.name)

    const isMobile = useMediaQuery('(max-width: 992px)')

    return (
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="text-disappear">
            <Link to="/">
              <ArrowLeftLineIcon 
                className={isMobile ? 'd-inline-block p-0 mr-2 text-blue link-unstyled font-mid' : 'd-none'}/>
            </Link>
            <span className="text-disappear">{name}</span>
          </h4>

          <ButtonToolbar className="ws-nowrap">xxx</ButtonToolbar>
        </div>

        <div className="d-flex justify-content-between align-itmes-center">
          <span>todo</span>
          <RoomInfoBtnModal/>
        </div>
      </div>
    )
};

export default memo(Top);
