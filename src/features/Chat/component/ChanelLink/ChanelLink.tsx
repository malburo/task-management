import { Typography } from '@mui/material';
import React from 'react';
import ChanelLinkStyle from './ChanelLinkStyle';

interface IChanelLinkPros {
  name: string;
  avatar: string;
}

const ChanelLink: React.FC<IChanelLinkPros> = ({ name, avatar }) => {
  const style = ChanelLinkStyle();

  return (
    <React.Fragment>
      <Typography variant="subtitle1" className={style.avatar}>
        {avatar}
      </Typography>
      <Typography variant="subtitle1" className={style.chanelName}>
        {name}
      </Typography>
    </React.Fragment>
  );
};

export default ChanelLink;
