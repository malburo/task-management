import { FormHelperText, InputAdornment } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
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
            sx={{
              borderRadius: '8px',
              border: '1px solid #E0E0E0',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
              fontSize: '12px',
              fontWeight: '500',
            }}
            type={isHidden ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
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