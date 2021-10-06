import React from 'react';
import Typography from '@mui/material/Typography';
import MyMessageStyle from './MyMessageStyle';

interface IMessagePros {
  postedDate: string;
  content: string;
}

const MyMessage: React.FC<IMessagePros> = ({ postedDate, content }) => {
  const style = MyMessageStyle();
  return (
    <React.Fragment>
      <div className={style.message}>
        <div>
          <div>
            <Typography variant="body2" className={style.messageContent}>
              {content}
            </Typography>
          </div>
          <div className={style.accountInfor}>
            <Typography variant="subtitle2" className={style.date}>
              {postedDate}
            </Typography>
          </div>
        </div>
        <div className={style.avatar}>
          <img
            className={style.avatarImg}
            alt="none"
            src="https://znews-photo.zadn.vn/w660/Uploaded/ngogtn/2021_04_25/avatar_movie_Cropped.jpg"
          ></img>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyMessage;
