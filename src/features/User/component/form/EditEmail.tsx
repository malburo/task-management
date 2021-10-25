import { Box, Paper, Typography } from '@mui/material';
import { AppDispatch } from 'app/store';
import InputField from 'components/form-control/InputField';
import { updateUserInfo } from 'features/Auth/authSlice';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

interface FormValues {
  email: string;
}
interface EditEmailState {
  value: string;
  userId: string;
}

const EditEmail: React.FC<EditEmailState> = ({ userId, value }) => {
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: value,
    },
  });
  useEffect(() => {
    form.reset({ email: value });
  }, [form, value]);

  const onSubmit = async ({ email }: FormValues) => {
    try {
      if (!userId) return;
      const payload = { userId, data: { email } };
      await dispatch(updateUserInfo(payload));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper sx={{ marginBottom: '24px' }} elevation={0}>
      <Box padding="24px">
        <Box marginBottom="24px">
          <Typography variant="bold6">Your email</Typography>
        </Box>

        <Box maxWidth="300px">
          <form id="email-form" onSubmit={form.handleSubmit(onSubmit)}>
            <InputField name="email" placeholder="Your email*" form={form} disabled />
          </form>
        </Box>
      </Box>
    </Paper>
  );
};

export default EditEmail;
