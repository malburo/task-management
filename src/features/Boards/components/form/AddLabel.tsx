import CheckIcon from '@mui/icons-material/Check';
import LabelIcon from '@mui/icons-material/Label';
import { Box, Button, Grid, Popover, Typography } from '@mui/material';
import labelApi from 'api/labelApi';
import taskApi from 'api/taskApi';
import InputBaseField from 'components/form-control/InputBaseField';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

interface FormValues {
  name: string;
}
interface Params {
  boardId: string;
  taskId: string;
}

const colors = [
  '#219653',
  '#F2C94C',
  '#F2994A',
  '#EB5757',
  '#2F80ED',
  '#56CCF2',
  '#6FCF97',
  '#333333',
  '#4F4F4F',
  '#828282',
  '#BDBDBD',
  '#E0E0E0',
];

const AddLabel: React.FC = () => {
  const { boardId, taskId } = useParams<Params>();
  const [selectColor, setSelectColor] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const form = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
    },
  });

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSelectColor = async (color: string) => {
    setSelectColor(color);
  };
  const onClickAdd = async () => {
    const payload = { boardId, name: form.getValues('name'), color: selectColor };
    const { data } = await labelApi.create(payload);
    await taskApi.pushLabel({ boardId, taskId, labelId: data.newLabel._id });
    setSelectColor('');
    form.reset();
    setAnchorEl(null);
  };
  return (
    <Box>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="inherit"
        startIcon={<LabelIcon />}
        fullWidth
        sx={{ justifyContent: 'flex-start', marginTop: '12px' }}
      >
        Label
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          marginTop: '12px',
          marginLeft: '-12px',
        }}
      >
        <Box padding="16px" minHeight="100px" width="200px">
          <Box>
            <Typography variant="bold2">Label</Typography>
          </Box>
          <Box>
            <Typography variant="regular2">Select a name and color</Typography>
          </Box>
          <Box boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)" marginTop="12px" marginBottom="24px">
            <InputBaseField form={form} name="name" placeholder="Label..." />
          </Box>
          <Grid container spacing={2}>
            {colors.map((color: string) => (
              <Grid item xs={3} key={color}>
                <Box
                  bgcolor={color}
                  height="30px"
                  borderRadius="4px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  onClick={() => onSelectColor(color)}
                  sx={{
                    '&:hover': {
                      opacity: 0.8,
                    },
                    cursor: 'pointer',
                  }}
                >
                  {selectColor === color && <CheckIcon sx={{ color: 'white' }} />}
                </Box>
              </Grid>
            ))}
          </Grid>
          <Button onClick={onClickAdd} variant="contained" color="primary" sx={{ margin: '0 auto' }}>
            Add
          </Button>
        </Box>
      </Popover>
    </Box>
  );
};

export default AddLabel;
