import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Input({id ,label, type , handler, value}) {
  return (
    <Box
      className='mb-5 mt-4'
      component="form"
    >
      <TextField sx={{
        width : "100%"
      }}
      onChange={(e) => handler(id, id === "file" ? e.target.files[0] : e.target.value)}
      id="outlined-basic"
      label={label}
      type={type}
      variant="outlined" />
    </Box>
  );
}
