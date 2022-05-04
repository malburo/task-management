import { Box, Card } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

interface Props {
  data: any;
}

const WhiteboardCard: React.FC<Props> = ({ data }) => {
  return (
    <Card raised sx={{ border: '2px solid #0000000a' }}>
      <Link to={`/boards/${data.boardId}/whiteboards/${data._id}`}>
        <CardMedia
          sx={{ height: '160px', borderRadius: '12px' }}
          image={data.coverUrl || 'https://www.viet247.net/images/noimage_food_viet247.jpg'}
        />
      </Link>
      <Box marginTop={3} marginBottom={5}>
        <Typography gutterBottom variant="regular4">
          {data.name}
        </Typography>
      </Box>
    </Card>
  );
};
export default WhiteboardCard;
