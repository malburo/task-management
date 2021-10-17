import React, { ReactElement, useEffect, useState } from 'react';
import MessageStyle from './MessageStyle';

import dateUtil from 'utilities/dateUtil';
import TimeLine from '../HorizontalRule/TimeLine';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

interface IMessagePros {
  name: string;
  postedDate: Date;
  content: string;
  profilePictureUrl: string;
  renderTimeLine: Boolean;
  time: Date;
  type: Number;
}

const Message: React.FC<IMessagePros> = ({
  name,
  postedDate,
  content,
  profilePictureUrl,
  renderTimeLine,
  time,
  type,
}) => {
  const style = MessageStyle();
  const [timeline, setTimeline] = useState<ReactElement>();
  useEffect(() => {
    if (renderTimeLine === true) setTimeline(<TimeLine time={new Date(time)} />);
    // eslint-disable-next-line
  }, [renderTimeLine]);
  return (
    <React.Fragment>
      {timeline}
      <div className={style.message}>
        <div className={style.avatar}>
          <img className={style.avatarImg} alt="none" src={profilePictureUrl}></img>
        </div>
        <div>
          <Box sx={{ display: 'flex' }}>
            {type === 1 ? (
              <div className={style.messageContent}>
                <Typography variant="body2">{content}</Typography>
              </div>
            ) : (
              <div className={`${style.messageContent} ${style.imageContent}`}>
                <img src={content} className={style.image} alt="failed to load" />
              </div>
            )}
          </Box>
          <div className={style.accountInfor}>
            <Typography variant="subtitle2" className={style.name}>
              {name},
            </Typography>
            <Typography variant="subtitle2">{dateUtil.fortmatDate(postedDate)}</Typography>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Message;
