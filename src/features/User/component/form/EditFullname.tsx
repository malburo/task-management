import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Paper, Typography } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { AppDispatch } from 'app/store';
import InputField from 'components/form-control/InputField';
import { updateUserInfo } from 'features/Auth/authSlice';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm, useFormState } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    fullname: yup.string().required().min(6).max(35),
  })
  .required();

interface FormValues {
  fullname: string;
}
interface EditFullnameState {
  value: string;
  userId: string;
}

const EditFullname: React.FC<EditFullnameState> = ({ userId, value }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      fullname: value,
    },
    resolver: yupResolver(schema),
  });

  const { isDirty, isValid } = useFormState({ control: form.control });

  useEffect(() => {
    form.reset({ fullname: value });
  }, [form, value]);

  const onSubmit: SubmitHandler<FormValues> = async ({ fullname }) => {
    setIsLoading(true);
    const toastId = toast.loading('Loading...');
    try {
      const payload = { userId, data: { fullname } };
      await dispatch(updateUserInfo(payload)).then(unwrapResult);
      toast.success('Successfully updated!', { id: toastId });
    } catch (error) {
      toast.error('Update failed!', { id: toastId });
    }
    setIsLoading(false);
  };

  return (
    <Paper sx={{ marginBottom: '24px' }}>
      <Box padding="24px">
        <Box marginBottom="24px">
          <Typography variant="bold6">Your Name</Typography>
        </Box>

        <Typography variant="regular3">
          Please enter your full name, or a display name you are comfortable with.
        </Typography>
        <Box maxWidth="300px" minHeight="100px">
          <form id="fullname-form" onSubmit={form.handleSubmit(onSubmit)}>
            <InputField name="fullname" placeholder="Your fullname*" form={form} />
          </form>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" padding="24px" bgcolor="#fafafa">
        <Typography variant="regular3">Please use 32 characters at maximum.</Typography>
        <LoadingButton
          type="submit"
          loading={isLoading}
          variant="contained"
          color="primary"
          disabled={isLoading || !(isDirty && isValid)}
          form="fullname-form"
        >
          Save
        </LoadingButton>
      </Box>
    </Paper>
  );
};

export default EditFullname;
