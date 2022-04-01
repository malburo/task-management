import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { IconButton, Popover } from '@mui/material';
import { Picker } from 'emoji-mart';
import React, { useState } from 'react';

interface EmojiPickerProps {
  setValue: any;
  getValues: any;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ setValue, getValues }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const onClickEmoji = (values: any) => {
    const { content } = getValues();
    console.log(values);
    setValue('content', content + values.native);
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <IconButton aria-label="Emoji" onClick={handleClick}>
        <InsertEmoticonIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Picker title="Pick your emoji…" emoji="point_up" onClick={onClickEmoji} set="apple" showSkinTones={false} />
      </Popover>
    </div>
  );
};

export default EmojiPicker;
