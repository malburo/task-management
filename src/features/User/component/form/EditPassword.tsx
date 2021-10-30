import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Paper, Typography } from '@mui/material';
import userApi from 'api/userApi';
import PasswordField from 'components/form-control/PasswordField';
import { useState } from 'react';
import { SubmitHandler, useForm, useFormState } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';

export interface FormValues {
  password: string;
  newPassword: string;
  retypeNewPassword: string;
}

const schema = yup
  .object()
  .shape({
    password: yup
      .string()
      .required('Please enter your password')
      .min(6, 'Please enter at least 6 characters.')
      .max(30, 'Please enter at most 30 characters'),
    newPassword: yup
      .string()
      .required('Please enter your password')
      .min(6, 'Please enter at least 6 characters.')
      .max(30, 'Please enter at most 30 characters'),
    retypeNewPassword: yup
      .string()
      .required('Please retype your password.')
      .oneOf([yup.ref('newPassword')], 'Password does not match'),
  })
  .required();

interface EditPasswordState {
  userId: string;
}

const EditPassword: React.FC<EditPasswordState> = ({ userId }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      password: '',
      newPassword: '',
      retypeNewPassword: '',
    },
    resolver: yupResolver(schema),
  });
  const { isDirty, isValid } = useFormState({ control: form.control });

  const onSubmit: SubmitHandler<FormValues> = async ({ password, newPassword }) => {
    setIsLoading(true);
    const toastId = toast.loading('Loading...');
    try {
      const payload = { userId, data: { currentPassword: password, newPassword } };
      await userApi.changePassword(payload);
      toast.success('Successfully updated!', { id: toastId });
      form.reset();
    } catch (error) {
      toast.error(error.message, { id: toastId });
    }
    setIsLoading(false);
  };

  return (
    <Paper sx={{ marginBottom: '192px' }}>
      <Box padding="24px">
        <Box marginBottom="24px">
          <Typography variant="bold6">Your Password</Typography>
        </Box>

        <Typography variant="regular3">
          Please enter your full name, or a display name you are comfortable with.
        </Typography>
        <Box maxWidth="300px" minHeight="260px" marginTop="32px">
          <form id="password-form" onSubmit={form.handleSubmit(onSubmit)}>
            <PasswordField name="password" placeholder="Your password*" form={form} />
            <PasswordField name="newPassword" placeholder="New password*" form={form} />
            <PasswordField name="retypeNewPassword" placeholder="Retype new password*" form={form} />
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
          form="password-form"
          disabled={isLoading || !(isDirty && isValid)}
        >
          Save
        </LoadingButton>
      </Box>
    </Paper>
  );
};

export default EditPassword;
