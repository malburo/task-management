import Typography from '@mui/material/Typography';
import React from 'react';
import HorizontalRuleStyle from './HorizontalRuleStyle';

interface HorizontalRulePros {
  time: string;
}

const HorizontalRule: React.FC<HorizontalRulePros> = ({ time }) => {
  const style = HorizontalRuleStyle();
  return (
    <React.Fragment>
      <div className={style.horizontalRule}>
        <hr className={style.hrElement}></hr>
        <Typography className={style.timeElement} variant="subtitle2" color="initial">
          {time}
        </Typography>
        <hr className={style.hrElement}></hr>
      </div>
    </React.Fragment>
  );
};

export default HorizontalRule;
