/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography } from '@mui/material';
import { IColumn } from 'models/column';

interface ColumnProps {
  column: IColumn;
}

const ColumnInChat: React.FC<ColumnProps> = ({ column }) => {
  return (
    <Box marginTop={5} bgcolor="#f8f9fd" borderRadius="8px" padding="8px" sx={{ cursor: 'move' }}>
      <Box display="flex" justifyContent="space-between">
        <Typography>{column.title}</Typography>
      </Box>
    </Box>
  );
};

export default ColumnInChat;
