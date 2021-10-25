import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Input,
  TextField,
  Box,
  Typography,
  Tab,
  Checkbox,
  FormControlLabel,
  FormControl,
  Alert,
} from '@mui/material';
import React, { Dispatch, SetStateAction, useState, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import FormStyle from './FormStyle';
import ReplayIcon from '@mui/icons-material/Replay';
import DoneIcon from '@mui/icons-material/Done';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import messageApi from 'api/messageApi';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';
import _ from 'lodash';

interface IPropsFormMessage {
  isOpen: boolean;
  setClose: Dispatch<SetStateAction<boolean>>;
}

const CreateFormMessage: React.FC<IPropsFormMessage> = (props) => {
  const [options, setOptions] = useState<string[]>([]);
  const [isOnAdd, setIsOnAdd] = useState<boolean>(false);
  const [isAddNew, setIsAddNew] = useState<boolean>(false);
  const [isMultiSelect, setIsMultiSelect] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const room = useSelector((state: RootState) => state.room.roomInfor);
  const [tab, setTab] = useState('tab1');
  const ref = useRef<any>();

  const style = FormStyle();

  const addToOptions = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.length > 0) {
      setOptions(_.uniqWith([...options, e.currentTarget.value], _.isEqual));
      e.currentTarget.value = '';
    }
  };

  const removeOption = (e: React.FormEvent<HTMLButtonElement>) => {
    setOptions(options.filter((i) => i !== e.currentTarget.value));
  };

  const reset = (e: React.FormEvent<HTMLButtonElement>) => {
    setOptions([]);
    setIsAddNew(false);
    setIsMultiSelect(false);
    setError('');
    ref.current.value = '';
  };

  const switchTab = (e: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const submitForm = (e: React.FormEvent<HTMLButtonElement>) => {
    let content = ref.current.value;
    messageApi
      .createFormMessage({
        roomId: room._id,
        option: options,
        isAddNew,
        isMultiSelect,
        content,
      })
      .then((data) => props.setClose(false))
      .catch((error) => setError(error.data.error.message));
  };

  return (
    <Dialog open={props.isOpen}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ lineHeight: '32px' }}>Create Select Form</Typography>
        <IconButton color="error" onClick={() => props.setClose(false)}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ width: '500px', maxWidth: '80vw' }}>
        <TabContext value={tab}>
          <Box sx={{ maxWidth: '80vw' }}>
            <TabList onChange={switchTab} aria-label="lab API tabs example">
              <Tab label="Content" value="tab1" />
              <Tab label="Configuration" value="tab2" />
            </TabList>
          </Box>
          <TabPanel value="tab1">
            <FormControl fullWidth>
              <TextField inputRef={ref} label="Content" fullWidth sx={{ margin: '20px 0 20px 0' }} />
            </FormControl>

            {options?.map((i) => (
              <Box key={i} className={style.button} sx={{ backgroundColor: '#dfdfdf', borderRadius: '10px' }}>
                <Typography sx={{ lineHeight: '40px', marginLeft: '10px' }}>{i}</Typography>
                <Button sx={{ height: '40px' }} value={i} key={i} onClick={removeOption}>
                  <CloseIcon />
                </Button>
              </Box>
            ))}
            {!isOnAdd && (
              <Button
                startIcon={<ControlPointIcon />}
                className={style.button}
                fullWidth
                variant="contained"
                sx={{ justifyContent: 'flex-start !important' }}
                onClick={() => setIsOnAdd(true)}
              >
                Add new
              </Button>
            )}
            {isOnAdd && (
              <Input
                className={style.button}
                onKeyDown={addToOptions}
                fullWidth
                autoFocus={true}
                onBlur={() => setIsOnAdd(false)}
              ></Input>
            )}
          </TabPanel>
          <TabPanel value="tab2">
            <FormControlLabel
              label="Enable to add new item when publish"
              control={<Checkbox checked={isAddNew} onChange={() => setIsAddNew(!isAddNew)} />}
            />
            <FormControlLabel
              label="Enable to select multi values"
              control={<Checkbox />}
              checked={isMultiSelect}
              onChange={() => setIsMultiSelect(!isMultiSelect)}
            />
          </TabPanel>
        </TabContext>
        {error && error.length > 0 && <Alert severity="error">{error}</Alert>}
      </DialogContent>

      <DialogActions>
        <Button color="warning" startIcon={<ReplayIcon />} sx={{ lineHeight: '32px' }} onClick={reset}>
          Reset
        </Button>
        <Button color="success" startIcon={<DoneIcon />} sx={{ lineHeight: '32px' }} onClick={submitForm}>
          Complete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateFormMessage;
