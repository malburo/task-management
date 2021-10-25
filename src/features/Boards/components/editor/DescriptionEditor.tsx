import { Box } from '@mui/system';
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { EditorState } from 'draft-js';
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import '../editor/editor.css';
import '@draft-js-plugins/inline-toolbar/lib/plugin.css';

const text = 'In this editor a toolbar shows up once you select part of the text …';
const DescriptionEditor: React.FC = () => {
  const [plugins, InlineToolbar] = useMemo(() => {
    const inlineToolbarPlugin = createInlineToolbarPlugin();
    return [[inlineToolbarPlugin], inlineToolbarPlugin.InlineToolbar];
  }, []);
  const [editorState, setEditorState] = useState(() => createEditorStateWithText(''));
  useEffect(() => {
    setEditorState(createEditorStateWithText(text));
  }, []);
  const editor = useRef<Editor | null>(null);
  const onChange = (value: EditorState): void => {
    setEditorState(value);
  };

  const focus = (): void => {
    editor.current?.focus();
  };
  return (
    <div className="editor" onClick={focus}>
      <Editor
        editorKey="SimpleInlineToolbarEditor"
        editorState={editorState}
        onChange={onChange}
        plugins={plugins}
        ref={(element) => {
          editor.current = element;
        }}
      />
      <InlineToolbar />
    </div>
  );
};

export default DescriptionEditor;
