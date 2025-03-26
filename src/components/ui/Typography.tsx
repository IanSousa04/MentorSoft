import React from 'react';
import { Typography as MuiTypography, TypographyProps } from '@mui/material';

interface CustomTypographyProps extends TypographyProps {
  component?: React.ElementType;
}

const Typography: React.FC<CustomTypographyProps> = ({ 
  variant = 'body1',
  component,
  children,
  ...props 
}) => {
  return (
    <MuiTypography
      variant={variant}
      component={component}
      {...props}
    >
      {children}
    </MuiTypography>
  );
};

export const PageTitle: React.FC<CustomTypographyProps> = ({ children, ...props }) => (
  <Typography
    variant="h4"
    component="h1"
    gutterBottom
    fontWeight="bold"
    {...props}
  >
    {children}
  </Typography>
);

export const SectionTitle: React.FC<CustomTypographyProps> = ({ children, ...props }) => (
  <Typography
    variant="h6"
    component="h2"
    gutterBottom
    fontWeight="medium"
    {...props}
  >
    {children}
  </Typography>
);

export default Typography;