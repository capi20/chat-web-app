import { Icon } from '@rsuite/icons';
import React from 'react';
import { Badge, IconButton, Tooltip, Whisper } from 'rsuite';
import PublicOpinionIcon from '@rsuite/icons/PublicOpinion';

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
                        appearance="primary"
                        {...props}
                        onClick={onClick}
                        circle
                        size="sm"
                        icon={<PublicOpinionIcon/>}
                    />

                </Whisper>
            </ConditionalBadge>

      </div>
  )
};

export default IconBtnControl;
