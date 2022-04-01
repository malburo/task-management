import { Box } from '@mui/material';
import { useCallback } from 'react';
import { Handle, Position } from 'react-flow-renderer';

const handleStyle = { left: 10 };

function TextUpdaterNode({ data }: any) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <Box sx={{ height: '50px', border: '1px solid #eee', padding: '5px', borderRadius: '5px', background: 'white' }}>
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} />
      </div>
      <Handle type="target" position={Position.Bottom} />
      <Handle type="source" position={Position.Bottom} style={handleStyle} />
    </Box>
  );
}

export default TextUpdaterNode;
