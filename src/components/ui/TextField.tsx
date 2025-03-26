import React from 'react';
import { TextField as MuiTextField, TextFieldProps } from '@mui/material';

const TextField: React.FC<TextFieldProps> = (props) => {
  return (
    <MuiTextField
      fullWidth
      variant="outlined"
      size="medium"
      {...props}
    />
  );
};

export default TextField;