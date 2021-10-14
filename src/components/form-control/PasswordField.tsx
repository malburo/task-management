import { FormHelperText, InputAdornment } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface PasswordFieldProps {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  size?: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
}

const PasswordField: React.FC<PasswordFieldProps> = (props) => {
  const { form, name, disabled, placeholder } = props;
  const { errors } = form.formState;
  const hasError = !!errors[name];
  const [isHidden, setIsHidden] = useState(false);

  const handleClickShowPassword = () => {
    setIsHidden((prev) => !prev);
  };
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormControl fullWidth variant="outlined" margin="normal" error={hasError}>
          <OutlinedInput
            {...field}
            disabled={disabled}
            placeholder={placeholder}
            id={name}
            type={isHidden ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  sx={{
                    backgroundColor: 'white',
                    color: 'rgba(0, 0, 0, 0.54)',
                    borderRadius: '50%',
                    '&:hover': {
                      backgroundColor: '#e4e4e4',
                    },
                  }}
                >
                  {isHidden ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>{errors[name]?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default PasswordField;
