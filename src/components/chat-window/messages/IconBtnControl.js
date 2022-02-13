import React from 'react';
import { Badge, IconButton, Tooltip, Whisper } from 'rsuite';
import { FaHeart, FaRegTimesCircle } from 'react-icons/fa'

const ConditionalBadge = ({condition, children}) => {
    return condition ? <Badge content={condition}>{children}</Badge> : children
}

const IconBtnControl = ({isVisible, iconName, tooltip, onClick, badgeContent, ...props}) => {
  return (
      <div 
        className="ml-2" 
        style={{visibility: isVisible ? 'visible' : 'hidden'}}>
            <ConditionalBadge condition={badgeContent}>
                <Whisper
                    placement="top"
                    delay={0}
                    delayClose={0}
                    delayOpen={0}
                    trigger="hover"
                    speaker={<Tooltip>{tooltip}</Tooltip>}
                >
                    <IconButton
                        appearance={ iconName === 'heart' && badgeContent > 0 ? 'primary' : 'default'}
                        {...props}
                        onClick={onClick}
                        circle
                        size="md"
                        icon={iconName === 'heart' ? <FaHeart/> : <FaRegTimesCircle/>}
                    />

                </Whisper>
            </ConditionalBadge>

      </div>
  )
};

export default IconBtnControl;
