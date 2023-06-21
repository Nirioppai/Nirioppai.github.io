import { FC, ReactNode } from 'react';

import Badge from '@mui/material/Badge/Badge';

interface CustomizedBadgesProps {
  cartItemCount?: number;
  color?: 'default' | 'primary' | 'secondary' | 'error';
  children?: ReactNode;
}

const CustomizedBadges: FC<CustomizedBadgesProps> = ({
  cartItemCount = 0,
  color = 'secondary',
  children,
}) => {
  return (
    <Badge badgeContent={cartItemCount} color={color}>
      {children}
    </Badge>
  );
};

export default CustomizedBadges;
