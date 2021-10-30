import { Skeleton, Stack } from '@mui/material';

const LinkPreviewSkeleteon = () => {
  return (
    <Stack sx={{}}>
      <Skeleton sx={{ backgroundColor: 'rgb(255 253 253 / 11%)' }} variant="rectangular" width={400} height={300} />
      <Skeleton sx={{ backgroundColor: 'rgb(255 253 253 / 11%)', marginTop: '20px' }} variant="text" />
      <Skeleton sx={{ backgroundColor: 'rgb(255 253 253 / 11%)' }} variant="text" />
      <Skeleton sx={{ backgroundColor: 'rgb(255 253 253 / 11%)' }} variant="text" />
    </Stack>
  );
};

export default LinkPreviewSkeleteon;
