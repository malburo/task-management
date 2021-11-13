import { BoldButton, ItalicButton, UnderlineButton, UnorderedListButton } from '@draft-js-plugins/buttons';
import Editor from '@draft-js-plugins/editor';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import '@draft-js-plugins/inline-toolbar/lib/plugin.css';
import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/system';
import 'draft-js/dist/Draft.css';
import React, { useMemo } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface EditorFieldProps {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  size?: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  autoComplete?: string;
  readOnly?: boolean;
  sx?: any;
}

const EditorField: React.FC<EditorFieldProps> = (props) => {
  const { form, name, placeholder, readOnly, sx } = props;
  const { errors } = form.formState;
  const hasError = !!errors[name];

  const [plugins, InlineToolbar] = useMemo(() => {
    const inlineToolbarPlugin = createInlineToolbarPlugin();
    return [[inlineToolbarPlugin], inlineToolbarPlugin.InlineToolbar];
  }, []);

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormControl fullWidth error={hasError}>
          <Box sx={sx}>
            <Editor
              editorKey={name}
              editorState={field.value}
              onChange={field.onChange}
              plugins={plugins}
              readOnly={readOnly}
              placeholder={placeholder}
            />
            <InlineToolbar>
              {(externalProps) => (
                <div>
                  <BoldButton {...externalProps} />
                  <ItalicButton {...externalProps} />
                  <UnderlineButton {...externalProps} />
                  <UnorderedListButton {...externalProps} />
                  {/* <OrderedListButton {...externalProps} /> */}
                </div>
              )}
            </InlineToolbar>
          </Box>
          <FormHelperText>{errors[name]?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default EditorField;
