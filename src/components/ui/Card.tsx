import React from 'react';
import { 
  Card as MuiCard, 
  CardContent, 
  CardProps as MuiCardProps,
  CardHeader as MuiCardHeader,
  CardHeaderProps
} from '@mui/material';

interface CardProps extends MuiCardProps {
  title?: string;
  headerProps?: Omit<CardHeaderProps, 'title'>;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  title,
  headerProps,
  ...props 
}) => {
  return (
    <MuiCard {...props}>
      {title && (
        <MuiCardHeader
          title={title}
          {...headerProps}
        />
      )}
      <CardContent>
        {children}
      </CardContent>
    </MuiCard>
  );
};

export default Card;