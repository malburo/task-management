import { LoadingButton } from '@mui/lab';
import { Box, Button, Paper, Typography } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import uploadApi from 'api/uploadApi';
import { AppDispatch } from 'app/store';
import { updateUserInfo } from 'features/Auth/authSlice';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

interface EditAvatarState {
  value: string;
  userId: string;
}

const EditAvatar: React.FC<EditAvatarState> = ({ userId, value }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>(value);
  const [profilePictureObj, setProfilePictureObj] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setProfilePictureUrl(value);
  }, [value]);

  useEffect(() => {
    return () => {
      profilePictureObj && URL.revokeObjectURL(profilePictureUrl);
    };
  }, [profilePictureObj, profilePictureUrl]);

  const handleChangeAvatar = async (event: any) => {
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
    const imageObj = event.target.files[0];
    if (!SUPPORTED_FORMATS.includes(imageObj.type)) {
      toast.error('Type file does not support');
      onCancel();
      return;
    }
    const image = URL.createObjectURL(imageObj);
    setProfilePictureObj(imageObj);
    setProfilePictureUrl(image);
    setIsValid(true);
    event.target.value = null;
  };

  const onCancel = () => {
    setProfilePictureUrl(value);
    setProfilePictureObj(null);
    setIsValid(false);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      let formData = new FormData();
      formData.append('image', profilePictureObj);
      const { data } = await uploadApi.upload(formData);
      const payload = { userId, data: { profilePictureUrl: data.result.secure_url } };
      await dispatch(updateUserInfo(payload)).then(unwrapResult);
      setProfilePictureUrl(value);
      setIsValid(false);
      toast.success('Successfully updated!');
    } catch (error) {
      toast.error('Update failed!');
    }
    setIsLoading(false);
  };
  return (
    <Paper sx={{ marginBottom: '24px' }}>
      <Box padding="24px" display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Box marginBottom="24px">
            <Typography variant="bold6">Your avatar</Typography>
          </Box>
          <Box>
            <Typography variant="regular3">This is your avatar.</Typography>
          </Box>
          <Box>
            <Typography variant="regular3">Click on the avatar to upload a custom one from your files.</Typography>
          </Box>
        </Box>
        <Box width="100px" height="100px" sx={{ '&:hover': { opacity: 0.8 } }} position="relative">
          <label htmlFor="contained-button-file">
            <input id="contained-button-file" type="file" onChange={handleChangeAvatar} style={{ display: 'none' }} />
            <img
              src={profilePictureUrl}
              alt="avatar"
              width="100%"
              height="100%"
              style={{ borderRadius: '50%', objectFit: 'cover', cursor: 'pointer' }}
            />
          </label>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" padding="24px" bgcolor="#fafafa">
        <Typography variant="regular3">An avatar is optional but strongly recommended.</Typography>
        <Box>
          {isValid && (
            <Button
              variant="contained"
              color="error"
              sx={{ marginRight: '24px' }}
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
          <LoadingButton
            type="submit"
            loading={isLoading}
            variant="contained"
            color="primary"
            disabled={isLoading || !isValid}
            onClick={onSubmit}
          >
            Save
          </LoadingButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default EditAvatar;
