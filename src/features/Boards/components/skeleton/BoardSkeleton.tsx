import { AvatarGroup, Box, Card, Skeleton } from '@mui/material';
import Typography from '@mui/material/Typography';

const BoardSkeleton = () => {
  return (
    <Card raised sx={{ border: '2px solid #0000000a' }}>
      <Skeleton variant="rectangular" height={130} />
      <Box marginTop={3} marginBottom={5}>
        <Typography variant="regular4">
          <Skeleton width="20%" />
        </Typography>
      </Box>
      <Box display="flex">
        <AvatarGroup max={5}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </AvatarGroup>
      </Box>
    </Card>
  );
};
export default BoardSkeleton;
