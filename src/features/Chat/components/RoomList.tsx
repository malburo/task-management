import { Avatar, Box, Typography } from '@mui/material';
import roomApi from 'api/roomApi';
import { membersSelector } from 'features/Boards/boardSlice';
import RoomListSkeleton from 'features/Chat/components/skeleton/RoomListSkeleton';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import SearchRoom from './SearchRoom';

interface Props {}
interface IParams {
  boardId: string;
  roomId: string;
}

const RoomList: React.FC<Props> = () => {
  const memberList = useSelector(membersSelector.selectAll);
  const [roomList, setRoomList] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { boardId, roomId } = useParams<IParams>();
  const [currentRoomId, setCurrentRoomId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await roomApi.getAll({ boardId });
        setRoomList(data.rooms);
        if (!roomId) history.push(`/boards/${boardId}/rooms/${data.rooms[0]._id}`);
      } catch (error) {}
      setIsLoading(false);
    })();
  }, []);

  const handleClickDirectMessage = async (memberId: string) => {
    const { data } = await roomApi.getRoomByMemberId({ boardId, memberId });
    setCurrentRoomId(memberId);
    history.push(`/boards/${boardId}/rooms/${data.room._id}`);
  };
  const handleClickGroupMessage = async (roomId: string) => {
    setCurrentRoomId('');
    const { data } = await roomApi.getOne({ roomId });
    history.push(`/boards/${boardId}/rooms/${data.room._id}`);
  };
  return (
    <Box bgcolor="#fff" padding="24px" height="80vh">
      <SearchRoom searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {isLoading ? (
        <RoomListSkeleton />
      ) : (
        <>
          <Box my={4}>
            <Typography variant="bold3">Channel</Typography>
          </Box>

          {roomList
            .filter((room: any) => room.type === 'GROUP')
            .map((room: any) => (
              <Box
                key={room._id}
                onClick={() => handleClickGroupMessage(room._id)}
                sx={{
                  color: 'text.primary',
                  bgcolor: roomId === room._id ? 'rgb(195 195 195 / 25%)' : '#fff',
                  cursor: 'pointer',
                  padding: 2,
                  borderRadius: 2,
                  '&:hover': { bgcolor: 'rgb(195 195 195 / 25%)' },
                }}
              >
                <Typography> # {room.name}</Typography>
              </Box>
            ))}

          <Box my={4}>
            <Typography variant="bold3"> Direct messages</Typography>
          </Box>
          {memberList
            .filter((member) => member.username.indexOf(searchTerm) >= 0)
            .map((member) => (
              <Box
                key={member._id}
                onClick={() => handleClickDirectMessage(member._id)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: 2,
                  borderRadius: 2,
                  color: 'text.primary',
                  bgcolor: currentRoomId === member._id ? 'rgb(195 195 195 / 25%)' : '#fff',
                  cursor: 'pointer',
                  mt: 4,
                  '&:hover': { bgcolor: 'rgb(195 195 195 / 25%)' },
                }}
              >
                <Box>
                  <Avatar sx={{ marginRight: '12px' }} src={member.profilePictureUrl} />
                </Box>
                <Box>
                  <Typography>{member.username}</Typography>
                </Box>
              </Box>
            ))}
        </>
      )}
    </Box>
  );
};

export default RoomList;
