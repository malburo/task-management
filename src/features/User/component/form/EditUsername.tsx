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
    username: yup.string().required().min(6).max(35),
  })
  .required();

interface FormValues {
  username: string;
}
interface EditUsernameState {
  value: string;
  userId: string;
}

const EditUsername: React.FC<EditUsernameState> = ({ userId, value }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      username: value,
    },
    resolver: yupResolver(schema),
  });
  const { isDirty, isValid } = useFormState({ control: form.control });

  useEffect(() => {
    form.reset({ username: value });
  }, [form, value]);

  const onSubmit: SubmitHandler<FormValues> = async ({ username }) => {
    setIsLoading(true);
    const toastId = toast.loading('Loading...');
    try {
      const payload = { userId, data: { username } };
      await dispatch(updateUserInfo(payload)).then(unwrapResult);
      toast.success('Successfully updated!', { id: toastId });
    } catch (error) {
      toast.error(error.message, { id: toastId });
    }
    setIsLoading(false);
  };

  return (
    <Paper sx={{ marginBottom: '24px' }}>
      <Box padding="24px">
        <Box marginBottom="24px">
          <Typography variant="bold6">Your Username</Typography>
        </Box>

        <Typography variant="regular3">Please enter your username.</Typography>
        <Box maxWidth="300px" minHeight="100px">
          <form id="username-form" onSubmit={form.handleSubmit(onSubmit)}>
            <InputField name="username" placeholder="Your username*" form={form} />
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
          form="username-form"
        >
          Save
        </LoadingButton>
      </Box>
    </Paper>
  );
};

export default EditUsername;
