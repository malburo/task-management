import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Controller, UseFormReturn } from 'react-hook-form';

interface InputFieldProps {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  size?: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
}

const InputField: React.FC<InputFieldProps> = (props) => {
  const { form, name, disabled, placeholder } = props;
  const { errors } = form.formState;
  const hasError = !!errors[name];

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
          />
          <FormHelperText>{errors[name]?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default InputField;
