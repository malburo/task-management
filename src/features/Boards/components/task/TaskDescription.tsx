import CreateIcon from '@mui/icons-material/Create';
import DescriptionIcon from '@mui/icons-material/Description';
import { LoadingButton } from '@mui/lab';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import taskApi from 'api/taskApi';
import EditorField from 'components/form-control/EditorField';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router';

interface Props {
  value: string;
}
interface Params {
  boardId: string;
  taskId: string;
}
interface FormValues {
  description: EditorState;
}

const TaskDescription: React.FC<Props> = ({ value }) => {
  const { boardId, taskId } = useParams<Params>();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [mode, setMode] = useState<'PREVIEW' | 'EDIT'>('PREVIEW');

  const form = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      description: () =>
        value ? EditorState.createWithContent(convertFromRaw(JSON.parse(value))) : EditorState.createEmpty(),
    },
  });
  const handleClickEditDescription = () => setMode('EDIT');
  const onClickCancel = () => {
    form.setValue('description', () =>
      value ? EditorState.createWithContent(convertFromRaw(JSON.parse(value))) : EditorState.createEmpty()
    );
    setMode('PREVIEW');
  };

  const onSubmit: SubmitHandler<FormValues> = async ({ description }) => {
    try {
      setIsloading(true);
      if (!description.getCurrentContent().hasText()) {
        setMode('PREVIEW');
        return;
      }
      const currentContent = description.getCurrentContent();
      const descriptionRaw = JSON.stringify(convertToRaw(currentContent));
      if (descriptionRaw === value) {
        setMode('PREVIEW');
        return;
      }
      const payload = { boardId, taskId, data: { description: descriptionRaw } };
      await taskApi.update(payload);
      setMode('PREVIEW');
    } catch (error) {}
    setIsloading(false);
  };
  return (
    <>
      <Box>
        <Box display="flex" alignItems="center" color="#BDBDBD" margin="12px 0px 12px 0px" height="30px">
          <DescriptionIcon sx={{ width: '20px', height: '20px', marginRight: '4px' }} />
          <Typography variant="regular2" sx={{ marginRight: '8px' }}>
            Description
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<CreateIcon />}
            size="small"
            onClick={handleClickEditDescription}
          >
            Edit
          </Button>
        </Box>
      </Box>
      <Box
        padding="12px"
        boxSizing="border-box"
        borderRadius="8px"
        marginBottom="12px"
        border={`${mode === 'PREVIEW' ? '1px solid transparent' : '1px solid #ddd'}`}
        bgcolor="#f7f7f7b0"
        minHeight="140px"
      >
        <Box minHeight="60px">
          <form onSubmit={form.handleSubmit(onSubmit)} id="description-form">
            <EditorField name="description" placeholder="Description..." form={form} readOnly={mode === 'PREVIEW'} />
          </form>
        </Box>
        {mode === 'EDIT' && (
          <Box marginTop="12px" textAlign="right">
            <Button variant="contained" color="error" sx={{ marginRight: '24px' }} onClick={onClickCancel}>
              Cancel
            </Button>
            <LoadingButton
              form="description-form"
              type="submit"
              loading={isLoading}
              variant="contained"
              color="primary"
            >
              Save
            </LoadingButton>
          </Box>
        )}
      </Box>
    </>
  );
};

export default TaskDescription;
