import { Avatar, Typography, Box } from '@mui/material';
import memberApi from 'api/memberApi';
import { RootState } from 'app/store';
import { IMember } from 'models/member';
import { IUser } from 'models/user';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import dateUtil from 'utilities/dateUtil';

interface IProps {
  value: IUser;
}

const AccountPreview: React.FC<IProps> = (props) => {
  const [member, setMember] = useState<IMember>();
  const board = useSelector((state: RootState) => state.board);

  useEffect(() => {
    memberApi.getOne(board._id, props.value._id).then((res) => setMember(res.data.member));
  }, [props.value, board]);

  return (
    <Box>
      <Box display="flex" alignItems="center" gap="10px" marginBottom="20px">
        <Avatar src={props.value.profilePictureUrl} alt="" />
        <Box>
          <Typography variant="bold5">{props.value.fullname}</Typography>
          <Typography variant="body2">{props.value.email}</Typography>
        </Box>
      </Box>
      {member && <Typography>Role: {member?.role}</Typography>}
      {member && <Typography>Join: {`${dateUtil.getDateMeaning(new Date(member?.createdAt))}`}</Typography>}
    </Box>
  );
};

export default AccountPreview;
