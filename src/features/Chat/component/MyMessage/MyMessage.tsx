import React, { ReactElement, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import MyMessageStyle from './MyMessageStyle';
import dateUtil from 'utilities/dateUtil';
import TimeLine from '../HorizontalRule/TimeLine';

interface IMessagePros {
  postedDate: Date;
  content: string;
  profilePictureUrl: string;
  renderTimeLine: Boolean;
  time: Date;
}

const MyMessage: React.FC<IMessagePros> = ({ postedDate, content, profilePictureUrl, renderTimeLine, time }) => {
  const style = MyMessageStyle();
  const [timeline, setTimeline] = useState<ReactElement>();
  useEffect(() => {
    if (renderTimeLine == true) setTimeline(<TimeLine time={new Date(time)} />);
  }, [renderTimeLine]);
  return (
    <React.Fragment>
      {timeline}
      <div className={style.message}>
        <div>
          <div>
            <Typography variant="body2" className={style.messageContent}>
              {content}
            </Typography>
          </div>
          <div className={style.accountInfor}>
            <Typography variant="subtitle2" className={style.date}>
              {dateUtil.fortmatDate(postedDate)}
            </Typography>
          </div>
        </div>
        <div className={style.avatar}>
          <img className={style.avatarImg} alt="none" src={profilePictureUrl}></img>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyMessage;
