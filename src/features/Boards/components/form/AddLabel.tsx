import CheckIcon from '@mui/icons-material/Check';
import { Box, Button, Grid, Typography } from '@mui/material';
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
interface Props {
  onClose: () => void;
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

const AddLabel: React.FC<Props> = ({ onClose }) => {
  const { boardId, taskId } = useParams<Params>();
  const [selectColor, setSelectColor] = useState<string>('');

  const form = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
    },
  });

  const onSelectColor = async (color: string) => {
    setSelectColor(color);
  };
  const onClickAdd = async () => {
    const payload = { boardId, name: form.getValues('name'), color: selectColor };
    const { data } = await labelApi.create(payload);
    await taskApi.pushLabel({ boardId, taskId, labelId: data.newLabel._id });
    setSelectColor('');
    form.reset();
    onClose();
  };
  return (
    <Box>
      <Box>
        <Typography variant="bold2">Label</Typography>
      </Box>
      <Box>
        <Typography variant="regular2">Select a name and color</Typography>
      </Box>
      <Box boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)" marginTop="12px" marginBottom="24px">
        <InputBaseField form={form} name="name" placeholder="Label..." sx={{ fontSize: '14px', padding: '4px 12px' }} />
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
      <Box textAlign="center" marginTop="12px">
        <Button onClick={onClickAdd} variant="contained" color="primary">
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default AddLabel;
