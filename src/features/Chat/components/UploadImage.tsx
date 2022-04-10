import UploadIcon from '@mui/icons-material/Upload';
import { IconButton } from '@mui/material';
import messageApi from 'api/messageApi';
import uploadApi from 'api/uploadApi';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

interface IParams {
  boardId: string;
  roomId: string;
}

const UploadImage = () => {
  const { roomId } = useParams<IParams>();

  const handleChangeAvatar = async (event: any) => {
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
    const imageObj = event.target.files[0];
    if (!SUPPORTED_FORMATS.includes(imageObj.type)) {
      toast.error('Type file does not support');
      return;
    }
    let formData = new FormData();
    formData.append('image', imageObj);
    const { data } = await uploadApi.upload(formData);
    console.log(data);
    const payload = { roomId, content: data.result.secure_url, type: 'IMAGE' };
    await messageApi.create(payload);
    event.target.value = null;
  };

  return (
    <IconButton aria-label="Emoji" component="label">
      <UploadIcon />
      <input type="file" onChange={handleChangeAvatar} hidden />
    </IconButton>
  );
};

export default UploadImage;
