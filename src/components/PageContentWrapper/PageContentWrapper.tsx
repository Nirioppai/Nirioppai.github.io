import { FC, ReactNode } from 'react';

import { Box, Container, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

interface PageContentWrapperProps {
  title: string;
  subtitle?: string;
  denseHeader?: boolean;
  children: ReactNode | ReactNode[];
}

const PageContentWrapper: FC<PageContentWrapperProps> = ({
  children,
  title,
  subtitle,
  denseHeader,
}) => {
  return (
    <>
      <Helmet title={title} />
      <Container>
        <Box
          component='header'
          sx={{
            pb: denseHeader ? 1 : 2,
          }}
        >
          <Typography variant='h1'>{title}</Typography>
          {subtitle && <Typography variant='subtitle1'>{subtitle}</Typography>}
        </Box>
        {children}
      </Container>
    </>
  );
};

export default PageContentWrapper;
