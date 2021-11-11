import { Dialog } from '@mui/material';
import React from 'react';

interface IProps {
  open: boolean;
  onClose: () => void;
  imageSrc: string;
}

const ImagePreview: React.FC<IProps> = (props) => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <img alt="" src={props.imageSrc} width={500} />
    </Dialog>
  );
};
export default ImagePreview;
