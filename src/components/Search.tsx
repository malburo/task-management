import { Box, Button } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";

const Search: React.FC = () => {
  return (
    <Box boxShadow="0px 4px 12px rgba(0, 0, 0, 0.05)" borderRadius={2}>
      <InputBase
        placeholder="Keyword..."
        sx={{
          fontSize: "12px",
          fontWeight: "500",
          width: "300px",
          marginLeft: 4,
        }}
        endAdornment={
          <Button
            color="primary"
            variant="contained"
            type="submit"
            sx={{ marginLeft: 3 }}
          >
            Search
          </Button>
        }
      />
    </Box>
  );
};

export default Search;
