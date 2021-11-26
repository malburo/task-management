import { Button, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Footer from 'components/Footer';
import Header from 'components/Header';
import SettingPNG from 'images/settings-bw.png';
import { useHistory } from 'react-router';

const PrivatePage = () => {
  const history = useHistory();
  return (
    <>
      <Header />
      <Container>
        <Grid container alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
          <Grid item sm={6}>
            <Box maxWidth="550px">
              <Typography sx={{ color: '#272E35', fontSize: '52px', lineHeight: '70px', fontWeight: '600' }}>
                This Board Not Found
              </Typography>
            </Box>
            <Box marginY="24px" maxWidth="280px">
              <Typography sx={{ color: '#6E757C', fontSize: '18px', lineHeight: '32px', fontWeight: '400' }}>
                This board can be private, you need permission to access
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              sx={{
                fontSize: '16px',
                lineHeight: '20px',
                fontWeight: '700',
                paddingX: '24px',
                height: '48px',
                borderRadius: '16px',
                marginRight: '24px',
              }}
              onClick={() => history.push('/')}
            >
              Return Home
            </Button>
          </Grid>
          <Grid item sm={6}>
            <Box width="800px">
              <img src={SettingPNG} alt="404-page" width="100%" />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default PrivatePage;
