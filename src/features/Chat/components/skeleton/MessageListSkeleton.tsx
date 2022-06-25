import { Box, Skeleton, Stack } from '@mui/material';

const MessageListSkeleton = () => {
  return (
    <Box overflow="hidden" width="300px">
      <Stack direction="row" alignItems="flex-start" marginTop={4}>
        <Box margin="4px 12px">
          <Skeleton animation="wave" variant="circular" width={40} height={40} />
        </Box>
        <Box>
          <Stack direction="row">
            <Skeleton animation="wave" width="100px" />
          </Stack>
          <Stack direction="row" spacing={1}>
            <Skeleton animation="wave" width="40px" />
            <Skeleton animation="wave" width="100px" />
            <Skeleton animation="wave" width="120px" />
          </Stack>
          <Stack direction="row" spacing={1}>
            <Skeleton variant="rectangular" animation="wave" width={150} height={150} />
          </Stack>
        </Box>
      </Stack>
      <Stack direction="row" alignItems="flex-start" marginTop={4}>
        <Box margin="4px 12px">
          <Skeleton animation="wave" variant="circular" width={40} height={40} />
        </Box>
        <Box>
          <Stack direction="row">
            <Skeleton animation="wave" width="100px" />
          </Stack>
          <Stack direction="row" spacing={1}>
            <Skeleton animation="wave" width="40px" />
            <Skeleton animation="wave" width="100px" />
            <Skeleton animation="wave" width="120px" />
          </Stack>
          <Stack direction="row" spacing={1}>
            <Skeleton animation="wave" width="40px" />
            <Skeleton animation="wave" width="120px" />
            <Skeleton animation="wave" width="120px" />
          </Stack>
          <Stack direction="row" spacing={1}>
            <Skeleton animation="wave" width="40px" />
            <Skeleton animation="wave" width="80px" />
            <Skeleton animation="wave" width="80px" />
            <Skeleton animation="wave" width="80px" />
            <Skeleton animation="wave" width="40px" />
            <Skeleton animation="wave" width="60px" />
          </Stack>
        </Box>
      </Stack>
      <Stack direction="row" alignItems="flex-start" marginTop={4}>
        <Box margin="4px 12px">
          <Skeleton animation="wave" variant="circular" width={40} height={40} />
        </Box>
        <Box>
          <Stack direction="row">
            <Skeleton animation="wave" width="100px" />
          </Stack>
          <Stack direction="row" spacing={1}>
            <Skeleton animation="wave" width="100px" />
            <Skeleton animation="wave" width="100px" />
            <Skeleton animation="wave" width="60px" />
            <Skeleton animation="wave" width="80px" />
            <Skeleton animation="wave" width="60px" />
          </Stack>
          <Stack direction="row" spacing={1}>
            <Skeleton animation="wave" width="60px" />
            <Skeleton animation="wave" width="40px" />
            <Skeleton animation="wave" width="40px" />
            <Skeleton animation="wave" width="100px" />
            <Skeleton animation="wave" width="80px" />
          </Stack>
        </Box>
      </Stack>
      <Stack direction="row" alignItems="flex-start" marginTop={4}>
        <Box margin="4px 12px">
          <Skeleton animation="wave" variant="circular" width={40} height={40} />
        </Box>
        <Box>
          <Stack direction="row">
            <Skeleton animation="wave" width="100px" />
          </Stack>
          <Stack direction="row" spacing={1}>
            <Skeleton animation="wave" width="40px" />
            <Skeleton animation="wave" width="100px" />
            <Skeleton animation="wave" width="120px" />
          </Stack>
          <Stack direction="row" spacing={1}>
            <Skeleton animation="wave" width="40px" />
            <Skeleton animation="wave" width="80px" />
            <Skeleton animation="wave" width="80px" />
            <Skeleton animation="wave" width="80px" />
            <Skeleton animation="wave" width="40px" />
            <Skeleton animation="wave" width="60px" />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
export default MessageListSkeleton;
