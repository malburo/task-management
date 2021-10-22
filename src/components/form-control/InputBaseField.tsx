import { FormHelperText, InputBase } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { Controller, UseFormReturn } from 'react-hook-form';

interface InputBaseProps {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
  size?: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  endAdornment?: JSX.Element;
}

const InputBaseField: React.FC<InputBaseProps> = (props) => {
  const { form, name, placeholder, endAdornment, autoFocus } = props;
  const { errors } = form.formState;
  const hasError = !!errors[name];
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormControl error={hasError} fullWidth>
          <InputBase {...field} placeholder={placeholder} endAdornment={endAdornment} fullWidth autoFocus={autoFocus} />
          {errors[name] && <FormHelperText>{errors[name]?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default InputBaseField;
