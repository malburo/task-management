import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import LabelIcon from '@mui/icons-material/Label';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Popover, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import taskApi from 'api/taskApi';
import InputBaseField from 'components/form-control/InputBaseField';
import { labelsSelector } from 'features/Boards/boardSlice';
import { ILabel } from 'models/label';
import { ITask } from 'models/task';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddLabel from '../label/AddLabel';
import EditLabel from '../label/EditLabel';

interface FormValues {
  search: string;
}
interface Params {
  boardId: string;
  taskId: string;
}
interface Props {
  task: ITask;
}
const AssignLabel: React.FC<Props> = ({ task }) => {
  const { boardId, taskId } = useParams<Params>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const labelList: ILabel[] = useSelector(labelsSelector.selectAll);
  const [mode, setMode] = useState<'ASSIGN' | 'CREATE' | 'EDIT'>('ASSIGN');
  const [selectedLabel, setSelectedLabel] = useState<ILabel | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? 'assign-label' : undefined;

  const form = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      search: '',
    },
  });
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setMode('ASSIGN');
  };

  const handleClose = () => {
    setAnchorEl(null);
    form.reset();
  };

  const handleClickLabel = async (labelId: string) => {
    if (task.labelsId.includes(labelId)) {
      await taskApi.pullLabel({ boardId, taskId, labelId });
      return;
    }
    await taskApi.pushLabel({ boardId, taskId, labelId });
  };
  const handleClickEditLabel = (label: ILabel) => {
    setSelectedLabel(label);
    setMode('EDIT');
  };
  const handleClickCreateLabel = () => {
    setMode('CREATE');
  };
  const handleSearchLabel = async ({ search }: FormValues) => {};

  return (
    <Box>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="inherit"
        startIcon={<LabelIcon />}
        fullWidth
        sx={{ justifyContent: 'flex-start', marginTop: '12px' }}
      >
        Label
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          marginTop: '12px',
        }}
      >
        <Box padding="16px" minHeight="100px" width="260px">
          {mode === 'CREATE' && <AddLabel onClose={handleClose} />}
          {mode === 'EDIT' && selectedLabel && <EditLabel onClose={handleClose} label={selectedLabel} />}
          {mode === 'ASSIGN' && (
            <>
              <Box>
                <Typography variant="bold2">Labels</Typography>
              </Box>
              <Box>
                <Typography variant="regular2">Assign label to this card </Typography>
              </Box>
              <Box boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)" marginTop="12px" borderRadius="8px">
                <form onSubmit={form.handleSubmit(handleSearchLabel)}>
                  <InputBaseField
                    form={form}
                    name="search"
                    placeholder="Label..."
                    sx={{ fontSize: '14px', padding: '4px 12px' }}
                    endAdornment={
                      <IconButton color="primary" type="submit">
                        <SearchIcon sx={{ fontSize: '16px' }} />
                      </IconButton>
                    }
                  />
                </form>
              </Box>
              <Box
                padding="12px"
                margin="24px 0px 12px 0px"
                boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
                borderRadius="12px"
              >
                {labelList
                  .filter((label) => label.name.includes(form.getValues('search')))
                  .map((label) => (
                    <Box display="flex" alignItems="center" justifyContent="space-between" key={label._id}>
                      <Box
                        bgcolor={`${label.color}33`}
                        marginY="4px"
                        padding="8px 12px"
                        marginRight="4px"
                        borderRadius="4px"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        flexGrow={1}
                        sx={{ '&:hover': { opacity: 0.8 }, cursor: 'pointer' }}
                        onClick={() => handleClickLabel(label._id)}
                      >
                        <Typography sx={{ color: label.color }} variant="regular2">
                          {label.name}
                        </Typography>
                        {task.labelsId.includes(label._id) && <CheckIcon sx={{ color: 'black', fontSize: '16px' }} />}
                      </Box>
                      <IconButton
                        onClick={() => handleClickEditLabel(label)}
                        size="small"
                        sx={{
                          bgcolor: 'white',
                          '&:hover': {
                            bgcolor: '#ccc',
                          },
                        }}
                      >
                        <EditIcon sx={{ color: '#42526e', fontSize: '16px' }} />
                      </IconButton>
                    </Box>
                  ))}
                <Button
                  variant="contained"
                  color="inherit"
                  fullWidth
                  sx={{ marginTop: '12px' }}
                  onClick={handleClickCreateLabel}
                >
                  Create new label
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Popover>
    </Box>
  );
};

export default AssignLabel;
