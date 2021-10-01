import Typography from '@material-ui/core/Typography';
import React from 'react';
import dateUtil from 'utilities/dateUtil';
import TimeLineStyle from './TimeLineStyle';

interface TimeLinePros {
  time: Date;
}

const TimeLine: React.FC<TimeLinePros> = ({ time }) => {
  const style = TimeLineStyle();
  return (
    <React.Fragment>
      <div className={style.horizontalRule}>
        <hr className={style.hrElement}></hr>
        <Typography className={style.timeElement} variant="subtitle2" color="initial">
          {`${dateUtil.getDayOfWeekString(time)}, ${time.getDate()}/${time.getMonth() + 1}`}
        </Typography>
        <hr className={style.hrElement}></hr>
      </div>
    </React.Fragment>
  );
};

export default TimeLine;
