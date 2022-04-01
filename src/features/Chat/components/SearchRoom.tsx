import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton } from '@mui/material';
import InputBaseField from 'components/form-control/InputBaseField';
import React from 'react';
import { useForm } from 'react-hook-form';

interface SearchRoomProps {
  searchTerm: any;
  setSearchTerm: any;
}

interface FormValues {
  search: string;
}

const SearchRoom: React.FC<SearchRoomProps> = ({ searchTerm, setSearchTerm }) => {
  const form = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      search: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    console.log(values);
    setSearchTerm(values.search);
    form.reset();
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box paddingY="16px">
      <Box boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)" marginTop="12px" borderRadius="8px">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <InputBaseField
            placeholder="Search..."
            name="search"
            form={form}
            sx={{ fontSize: '14px', padding: '4px 12px', backgroundColor: 'white', borderRadius: '4px' }}
            endAdornment={
              <IconButton color="primary" type="submit">
                <SearchIcon sx={{ fontSize: '16px' }} />
              </IconButton>
            }
          />
        </form>
      </Box>
    </Box>
  );
};

export default SearchRoom;
