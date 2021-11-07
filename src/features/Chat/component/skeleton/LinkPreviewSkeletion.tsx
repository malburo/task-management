import { Skeleton, Stack } from '@mui/material';

const LinkPreviewSkeleteon = () => {
  return (
    <Stack sx={{ backgroundColor: 'white', border: '1px solid #adadad', borderRadius: '5px' }}>
      <Skeleton sx={{ margin: '10px' }} variant="rectangular" width={400} height={300} />
      <Skeleton sx={{ margin: '10px' }} variant="text" />
      <Skeleton sx={{ margin: '10px' }} variant="text" />
      <Skeleton sx={{ margin: '10px' }} variant="text" />
    </Stack>
  );
};

export default LinkPreviewSkeleteon;
