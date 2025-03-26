import React from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select as MuiSelect, 
  MenuItem,
  SelectProps as MuiSelectProps 
} from '@mui/material';

interface SelectProps extends MuiSelectProps {
  label: string;
  options: Array<{ value: string; label: string; }>;
}

const Select: React.FC<SelectProps> = ({ 
  label, 
  options, 
  ...props 
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;