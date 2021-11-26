import React, { ReactElement, useEffect, useState } from 'react';
import dateUtil from 'utilities/dateUtil';
import TimeLine from '../HorizontalRule/TimeLine';
import { Box } from '@mui/system';
import { Avatar, Button, Dialog, DialogContent, DialogTitle, Tooltip, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'app/store';
import { IUser } from 'models/user';
import ISelectFormMessage from 'models/selectMessage';
import AccountPreview from '../AccountPreview';
import { columnsSelector, getOneBoard, updateBoard } from 'features/Boards/boardSlice';
import { applyDrag } from 'utilities/dragDrop';
import { mapOrder } from 'utilities/sorts';
import { IColumn } from 'models/column';
import boardApi from 'api/boardApi';
import { Container, Draggable, DropResult } from '@richardrout/react-smooth-dnd';
import ColumnInChat from '../ColumnInChat';
import useBotMessageStyles from './style';

interface IProps {
  postedDate: Date;
  content: string;
  renderTimeLine: Boolean;
  time: Date;
  type: Number;
  owner: IUser;
  form?: ISelectFormMessage;
}

const BotMessage: React.FC<IProps> = (props) => {
  const { content, renderTimeLine, type } = props;
  const style = useBotMessageStyles();
  const [timeline, setTimeline] = useState<ReactElement>();
  const board = useSelector((state: RootState) => state.board);
  const columns: IColumn[] = useSelector((state: RootState) => {
    const allTasks = columnsSelector.selectAll(state);
    return mapOrder(allTasks, board.columnOrder, '_id');
  });
  const [openDragColumn, setOpenDragColumn] = useState<boolean>(type === 6);
  const [openTooltip, setOpenTooltip] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (renderTimeLine === true) setTimeline(<TimeLine time={new Date(props.time)} />);
    // eslint-disable-next-line
  }, [renderTimeLine]);

  const onColumnDrop = async (dropResult: DropResult) => {
    try {
      if (dropResult.addedIndex === dropResult.removedIndex) return;
      const newColumns = applyDrag(columns, dropResult);
      const newColumnOrder = newColumns.map((column: IColumn) => column._id);
      await dispatch(updateBoard({ changes: { columnOrder: newColumnOrder } }));
      await boardApi.update({ boardId: board._id, data: { columnOrder: newColumnOrder } });
    } catch (error) {
      await dispatch(getOneBoard({ boardId: board._id }));
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      {timeline}
      <Box className={style.message}>
        <Box className={style.avatar}>
          <Tooltip arrow placement="top" open={openTooltip} title={<AccountPreview value={props.owner} />}>
            <Avatar
              onMouseEnter={() => setOpenTooltip(true)}
              onMouseLeave={() => setOpenTooltip(false)}
              className={style.avatarImg}
              alt="none"
              src={props.owner.profilePictureUrl}
            />
          </Tooltip>
        </Box>
        <Box>
          <Box flex="true">
            {type === 6 && (
              <Box className={style.messageContent}>
                <Typography variant="body2" sx={{ maxWidth: '60vw', overflowX: 'hidden' }}>
                  {content}
                </Typography>
                <Dialog open={openDragColumn}>
                  <DialogTitle>
                    Modify Column
                    <Button sx={{ float: 'right' }} variant="contained" onClick={() => setOpenDragColumn(false)}>
                      X
                    </Button>
                  </DialogTitle>
                  <DialogContent sx={{ width: '40vw' }}>
                    <Container
                      behaviour="contain"
                      orientation="vertical"
                      disableScrollOverlapDetection={true}
                      onDrop={onColumnDrop}
                      getChildPayload={(index: number) => columns[index]}
                      style={{
                        minWidth: 0,
                        overflowX: 'scroll',
                      }}
                    >
                      {columns.map((column: IColumn) => (
                        <Draggable key={column._id}>
                          <ColumnInChat column={column} />
                        </Draggable>
                      ))}
                    </Container>
                  </DialogContent>
                </Dialog>
              </Box>
            )}
            {type === 1 && (
              <Box className={style.messageContent}>
                <Typography variant="body2" sx={{ maxWidth: '60vw', overflowX: 'hidden' }}>
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </Typography>
              </Box>
            )}
          </Box>
          <Box className={style.accountInfor}>
            <Typography sx={{ fontSize: '0.75em' }} variant="subtitle2">
              {dateUtil.fortmatDate(props.postedDate)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default BotMessage;
