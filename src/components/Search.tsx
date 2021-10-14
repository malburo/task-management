import { Box, Button } from '@mui/material';
import InputBase from '@mui/material/InputBase';

const Search: React.FC = () => {
  return (
    <Box boxShadow="0px 2px 12px rgba(0, 0, 0, 0.08)" borderRadius={2} width="400px" marginRight={8}>
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
