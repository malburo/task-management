import { InputBase, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Controller, UseFormReturn } from 'react-hook-form';

interface EditableFieldState {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  size?: string;
  onBlur: any;
}
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    cursor: 'pointer',
    padding: '0px 4px',
    boxSizing: 'border-box',
    borderRadius: '4px',
    touchAction: 'none',
  },
  focused: {
    backgroundColor: 'white',
    border: '1px solid #ccc',
  },
}));

const EditableField: React.FC<EditableFieldState> = (props) => {
  const classes = useStyles();
  const { form, name, placeholder, onBlur } = props;
  const selectAllText = (e: any) => {
    e.target.focus();
    e.target.select();
  };
  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <InputBase
          {...field}
          placeholder={placeholder}
          fullWidth
          onKeyPress={handleKeyPress}
          onFocus={selectAllText}
          onBlur={form.handleSubmit(onBlur)}
          classes={{ root: classes.root, focused: classes.focused }}
        />
      )}
    />
  );
};

export default EditableField;
