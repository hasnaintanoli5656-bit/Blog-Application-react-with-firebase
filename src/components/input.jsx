import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Input({label, type , handler, value}) {
  return (
    <Box
      className='mb-5 mt-4'
      component="form"
    >
      <TextField sx={{
        width : "100%"
      }}
      onChange={(e) => handler(type, e.target.value)}
      id="outlined-basic"
      label={label}
      type={type}
      value={value}
      variant="outlined" />
    </Box>
  );
}
