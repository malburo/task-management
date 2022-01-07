import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Footer from 'components/Footer';
import Header from 'components/Header';
import WorkingPNG from 'images/working-bw.png';

const LandingPage = () => {
  return (
    <>
      <Header />
      <Paper>
        <Container>
          <Grid container alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
            <Grid item sm={6}>
              <Box maxWidth="550px">
                <Typography color="textPrimary" sx={{ fontSize: '52px', lineHeight: '70px', fontWeight: '600' }}>
                  Make Management Way More Easier Than Ever
                </Typography>
              </Box>
              <Box marginY="24px" maxWidth="450px">
                <Typography sx={{ color: '#6E757C', fontSize: '18px', lineHeight: '32px', fontWeight: '400' }}>
                  The online collaborative management platform to bring more efficiency and performance
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
              >
                Request Demo
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                sx={{
                  fontSize: '16px',
                  lineHeight: '20px',
                  fontWeight: '700',
                  paddingX: '24px',
                  height: '48px',
                  borderRadius: '16px',
                }}
              >
                Contact Us
              </Button>
            </Grid>
            <Grid item sm={6}>
              <Box width="800px">
                <img src={WorkingPNG} alt="landing-page" width="100%" />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <Footer />
    </>
  );
};

export default LandingPage;
