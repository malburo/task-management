import { Box, Button, Typography } from '@mui/material';

const DeleteAccount = () => {
  return (
    <Box width="100%" border="1px solid #eaeaea" marginBottom="48px">
      <Box padding="24px">
        <Box marginBottom="24px">
          <Typography variant="bold6">Delete Personal Account</Typography>
        </Box>

        <Typography variant="regular3">
          Permanently remove your Personal Account and all of its contents from the Vercel platform. This action is not
          reversible, so please continue with caution.
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" padding="24px" bgcolor="#fafafa">
        <Typography variant="regular3"></Typography>
        <Button type="submit" color="error" form="username-form">
          Delete Personal Account
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteAccount;
