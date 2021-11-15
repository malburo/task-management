import { yupResolver } from '@hookform/resolvers/yup';
import CheckIcon from '@mui/icons-material/Check';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, Typography } from '@mui/material';
import labelApi from 'api/labelApi';
import InputBaseField from 'components/form-control/InputBaseField';
import { ILabel } from 'models/label';
import React, { useState } from 'react';
import { SubmitHandler, useForm, useFormState } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    name: yup.string().required().min(2).max(16),
    color: yup.string().required(),
  })
  .required();

interface FormValues {
  name: string;
  color: string;
}
interface Params {
  boardId: string;
  taskId: string;
}
interface Props {
  onClose: () => void;
  label: ILabel;
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

const EditLabel: React.FC<Props> = ({ onClose, label }) => {
  const { boardId } = useParams<Params>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: label.name,
      color: label.color,
    },
    resolver: yupResolver(schema),
  });
  const { isValid } = useFormState({ control: form.control });

  const onSelectColor = async (color: string) => {
    form.setValue('color', color);
    form.trigger();
  };
  const onSubmit: SubmitHandler<FormValues> = async ({ name, color }) => {
    try {
      setIsLoading(true);
      if (name === label.name && color === label.color) {
        onClose();
        return;
      }
      const data = { name, color };
      await labelApi.update({ boardId, labelId: label._id, data });
      form.reset();
      onClose();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  return (
    <Box>
      <Box>
        <Typography variant="bold2">Edit Label</Typography>
      </Box>
      <Box>
        <Typography variant="regular2">Edit name and color</Typography>
      </Box>
      <Box boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)" marginTop="12px" marginBottom="24px">
        <form id="label-edit-form" onSubmit={form.handleSubmit(onSubmit)}>
          <InputBaseField
            form={form}
            name="name"
            placeholder="Label..."
            sx={{ fontSize: '14px', padding: '4px 12px' }}
            maxLength={16}
          />
        </form>
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
              {form.getValues('color') === color && <CheckIcon sx={{ color: 'white' }} />}
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box textAlign="center" marginTop="12px">
        <LoadingButton
          type="submit"
          loading={isLoading}
          variant="contained"
          color="primary"
          disabled={isLoading || !isValid}
          form="label-edit-form"
        >
          Save
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default EditLabel;
