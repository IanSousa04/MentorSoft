import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ButtonProps extends Omit<MuiButtonProps, 'startIcon'> {
  icon?: LucideIcon;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  icon: Icon,
  variant = 'contained',
  ...props 
}) => {
  return (
    <MuiButton
      variant={variant}
      startIcon={Icon && <Icon size={20} />}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;