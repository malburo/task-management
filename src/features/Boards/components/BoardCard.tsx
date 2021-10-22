import { Avatar, AvatarGroup, Box, Card } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IBoard } from 'models/board';
import { Link } from 'react-router-dom';

interface Props {
  data: IBoard;
}

const BoardCard: React.FC<Props> = ({ data }) => {
  return (
    <Card raised sx={{ border: '2px solid #0000000a' }}>
      <Link to={`/boards/${data._id}`}>
        <CardMedia
          sx={{ height: '130px', borderRadius: '12px' }}
          image={data.coverUrl || 'https://www.viet247.net/images/noimage_food_viet247.jpg'}
        />
      </Link>
      <Box marginTop={3} marginBottom={5}>
        <Typography gutterBottom variant="regular4">
          {data.title}
        </Typography>
      </Box>
      <Box display="flex">
        <AvatarGroup max={5}>
          {data.members.map((member, index) => (
            <Avatar variant="rounded" src={member.profilePictureUrl} key={index} />
          ))}
        </AvatarGroup>
      </Box>
    </Card>
  );
};
export default BoardCard;
