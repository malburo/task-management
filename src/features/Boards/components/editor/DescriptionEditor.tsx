import {
  BoldButton,
  ItalicButton,
  OrderedListButton,
  UnderlineButton,
  UnorderedListButton,
} from '@draft-js-plugins/buttons';
import Editor from '@draft-js-plugins/editor';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import '@draft-js-plugins/inline-toolbar/lib/plugin.css';
import CreateIcon from '@mui/icons-material/Create';
import DescriptionIcon from '@mui/icons-material/Description';
import { LoadingButton } from '@mui/lab';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import taskApi from 'api/taskApi';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import '../editor/editor.css';

interface State {
  content: any;
}
interface Params {
  boardId: string;
  taskId: string;
}
const DescriptionEditor: React.FC<State> = ({ content }) => {
  const { boardId, taskId } = useParams<Params>();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [plugins, InlineToolbar] = useMemo(() => {
    const inlineToolbarPlugin = createInlineToolbarPlugin();
    return [[inlineToolbarPlugin], inlineToolbarPlugin.InlineToolbar];
  }, []);

  const [editorState, setEditorState] = useState(() => {
    if (content) return EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
    return EditorState.createEmpty();
  });

  useEffect(() => {
    if (content) setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(content))));
  }, [content]);

  const onChange = (value: EditorState): void => {
    setEditorState(value);
  };

  const onClickSave = async () => {
    try {
      setIsloading(true);
      const a = editorState.getCurrentContent();
      const description = JSON.stringify(convertToRaw(a));
      const payload = { boardId, taskId, data: { description } };
      await taskApi.update(payload);
      setIsEdit(false);
    } catch (error) {}
    setIsloading(false);
  };

  const onClickCancel = () => {
    if (content) setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(content))));
    setIsEdit(false);
  };

  const handleClickEditDescription = () => {
    setIsEdit(true);
  };
  return (
    <>
      <Box>
        <Box display="flex" alignItems="center" color="#BDBDBD" margin="12px 0px 12px 0px" height="30px">
          <DescriptionIcon sx={{ width: '20px', height: '20px', marginRight: '4px' }} />
          <Typography variant="regular2" sx={{ marginRight: '4px' }}>
            Description
          </Typography>
          {isEdit || (
            <Button
              onClick={handleClickEditDescription}
              variant="outlined"
              color="inherit"
              startIcon={<CreateIcon />}
              size="small"
            >
              Edit
            </Button>
          )}
        </Box>
      </Box>
      <Box className={`editor ${isEdit && 'editor-focus'}`}>
        <Editor
          editorKey="SimpleInlineToolbarEditor"
          editorState={editorState}
          onChange={onChange}
          plugins={plugins}
          readOnly={!isEdit}
          placeholder="Description..."
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
        {isEdit && (
          <Box marginTop="12px" textAlign="right">
            <Button variant="contained" color="error" sx={{ marginRight: '24px' }} onClick={onClickCancel}>
              Cancel
            </Button>
            <LoadingButton type="submit" loading={isLoading} variant="contained" color="primary" onClick={onClickSave}>
              Save
            </LoadingButton>
          </Box>
        )}
      </Box>
    </>
  );
};

export default DescriptionEditor;
