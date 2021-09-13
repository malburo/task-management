import { FormHelperText, InputBase } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { Controller, UseFormReturn } from 'react-hook-form';

interface InputBaseProps {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  size?: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  endAdornment?: JSX.Element;
}

const InputBaseField: React.FC<InputBaseProps> = (props) => {
  const { form, name, placeholder, endAdornment } = props;
  const { errors } = form.formState;
  const hasError = !!errors[name];
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormControl error={hasError} fullWidth>
          <InputBase {...field} placeholder={placeholder} endAdornment={endAdornment} fullWidth />
          {errors[name] && <FormHelperText>{errors[name]?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default InputBaseField;
