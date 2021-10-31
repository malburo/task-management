import {
  BoldButton,
  ItalicButton,
  OrderedListButton,
  UnderlineButton,
  UnorderedListButton,
} from '@draft-js-plugins/buttons';
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import '@draft-js-plugins/inline-toolbar/lib/plugin.css';
import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import '../editor/editor.css';

interface State {
  content: string;
}

const DescriptionEditor: React.FC<State> = ({ content = '' }) => {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [plugins, InlineToolbar] = useMemo(() => {
    const inlineToolbarPlugin = createInlineToolbarPlugin();
    return [[inlineToolbarPlugin], inlineToolbarPlugin.InlineToolbar];
  }, []);

  const [editorState, setEditorState] = useState(() => createEditorStateWithText(''));
  const editor = useRef<Editor | null>(null);

  useEffect(() => {
    setEditorState(createEditorStateWithText(content));
  }, [content]);

  const focus = (): void => {
    editor.current?.focus();
  };

  const onChange = (value: EditorState): void => {
    setEditorState(value);
  };

  const onClickSave = () => {
    console.log(editorState);
  };

  const onClickCancel = () => {};

  return (
    <div className="editor" onClick={focus}>
      <Editor
        editorKey="SimpleInlineToolbarEditor"
        editorState={editorState}
        onChange={onChange}
        plugins={plugins}
        placeholder="Description..."
        ref={(element) => {
          editor.current = element;
        }}
      />
      <InlineToolbar>
        {(externalProps) => (
          <div>
            <BoldButton {...externalProps} />
            <ItalicButton {...externalProps} />
            <UnderlineButton {...externalProps} />
            <UnorderedListButton {...externalProps} />
            <OrderedListButton {...externalProps} />
          </div>
        )}
      </InlineToolbar>
      <Box>
        <Button variant="contained" color="error" sx={{ marginRight: '24px' }} onClick={onClickCancel}>
          Cancel
        </Button>
        <LoadingButton type="submit" loading={isLoading} variant="contained" color="primary" onClick={onClickSave}>
          Save
        </LoadingButton>
      </Box>
    </div>
  );
};

export default DescriptionEditor;
