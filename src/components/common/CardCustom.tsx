import { Card } from '@mui/material';

const CardCustom: React.FC<any> = ({ children, width }: any) => {
  return (
    <Card
      sx={{
        width,
        padding: '16px',
        borderRadius: '12px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
        whiteSpace: 'normal',
        boxSizing: 'border-box',
        transition: 'all 0.2s',
      }}
    >
      {children}
    </Card>
  );
};

export default CardCustom;
