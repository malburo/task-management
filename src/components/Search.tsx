import { Box, Button } from '@mui/material';
import InputBase from '@mui/material/InputBase';

const Search: React.FC = () => {
  return (
    <Box
      borderRadius={2}
      width="400px"
      marginRight={8}
      bgcolor="rgb(243, 246, 249)"
      border="1px solid rgb(229, 232, 236)"
    >
      <InputBase
        placeholder="Keyword..."
        fullWidth
        sx={{
          fontSize: '14px',
          lineHeight: '14px',
          fontWeight: '500',
          paddingLeft: 4,
        }}
        endAdornment={
          <Button color="primary" variant="contained" type="submit">
            Search
          </Button>
        }
      />
    </Box>
  );
};

export default Search;
