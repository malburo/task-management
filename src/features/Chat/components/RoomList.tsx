import { Avatar, Badge, Box, Typography } from '@mui/material';
import roomApi from 'api/roomApi';
import { socketClient } from 'api/socketClient';
import { RootState } from 'app/store';
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
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const memberList = useSelector(membersSelector.selectAll);
  const [roomList, setRoomList] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { boardId, roomId } = useParams<IParams>();
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

  useEffect(() => {
    socketClient.on('rooms:update', async (newRoom: any) => {
      const { data } = await roomApi.getAll({ boardId });
      setRoomList(data.rooms);
    });
    return () => {
      socketClient.off('rooms:update');
    };
  }, []);

  const handleClickUser = async (memberId: string) => {
    const { data } = await roomApi.getRoomByMemberId({ boardId, memberId });
    history.push(`/boards/${boardId}/rooms/${data.room._id}`);
  };
  const handleClickRoom = async (roomId: string) => {
    const roomListClone = [...roomList];
    const index = roomListClone.findIndex((room) => room._id === roomId);
    roomListClone[index].unReadCount = 0;
    setRoomList(roomListClone);
    const { data } = await roomApi.getOne({ roomId });
    history.push(`/boards/${boardId}/rooms/${data.room._id}`);
  };
  return (
    <Box bgcolor="#fff" padding="24px" height="80vh" minWidth="200px">
      <SearchRoom searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {isLoading ? (
        <RoomListSkeleton />
      ) : (
        <>
          <Box my={4}>
            <Typography variant="bold3">Channel</Typography>
          </Box>

          {roomList.map((room: any) => {
            return (
              room.type === 'GROUP' && (
                <Box
                  key={room._id}
                  onClick={() => handleClickRoom(room._id)}
                  sx={{
                    color: 'text.primary',
                    bgcolor: roomId === room._id ? 'rgb(195 195 195 / 25%)' : '#fff',
                    cursor: 'pointer',
                    padding: 2,
                    borderRadius: 2,
                    '&:hover': { bgcolor: 'rgb(195 195 195 / 25%)' },
                  }}
                >
                  {room.unReadCount === 0 ? (
                    <Typography> # {room.name}</Typography>
                  ) : (
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography> # {room.name}</Typography>
                      <Badge variant="dot" color="primary" sx={{ marginRight: 4 }}></Badge>
                    </Box>
                  )}
                </Box>
              )
            );
          })}

          <Box my={4}>
            <Typography variant="bold3"> Direct messages</Typography>
          </Box>
          {roomList.map((room: any) => {
            return (
              room.type !== 'GROUP' && (
                <Box
                  key={room._id}
                  onClick={() => handleClickRoom(room._id)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 2,
                    borderRadius: 2,
                    color: 'text.primary',
                    bgcolor: roomId === room._id ? 'rgb(195 195 195 / 25%)' : '#fff',
                    cursor: 'pointer',
                    mt: 4,
                    '&:hover': { bgcolor: 'rgb(195 195 195 / 25%)' },
                  }}
                >
                  <Box>
                    <Avatar
                      sx={{ marginRight: '12px' }}
                      src={
                        memberList.find(
                          (member) => member._id !== currentUser?._id && room.usersId.includes(member._id)
                        )?.profilePictureUrl
                      }
                    />
                  </Box>
                  <Box>
                    {room.unReadCount === 0 ? (
                      <Typography>
                        {
                          memberList.find(
                            (member) => member._id !== currentUser?._id && room.usersId.includes(member._id)
                          )?.username
                        }
                      </Typography>
                    ) : (
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography>
                          {
                            memberList.find(
                              (member) => member._id !== currentUser?._id && room.usersId.includes(member._id)
                            )?.username
                          }
                        </Typography>
                        <Badge variant="dot" color="primary" sx={{ marginLeft: 8 }}></Badge>
                      </Box>
                    )}
                  </Box>
                </Box>
              )
            );
          })}
          {memberList
            .filter(
              (member) =>
                member.username.indexOf(searchTerm) >= 0 &&
                member._id !== currentUser?._id &&
                roomList
                  .filter((room: any) => room.type !== 'GROUP')
                  .map((room: any) => room.usersId)
                  .flat()
                  .includes(member._id) === false
            )
            .map((member) => (
              <Box
                key={member._id}
                onClick={() => handleClickUser(member._id)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: 2,
                  borderRadius: 2,
                  color: 'text.primary',
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
