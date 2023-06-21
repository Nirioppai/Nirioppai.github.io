import { FC } from 'react';

import { Box, Button, Paper, Typography } from '@mui/material';
import { ImageBrokenVariant as ImageBrokenVariantIcon } from 'mdi-material-ui';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

interface NotFoundProps {
  link?: string;
  height?: string;
}

const NotFound: FC<NotFoundProps> = ({ link, height }) => (
  <>
    <Helmet title='Page Not Found' />
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: height || '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 3,
        }}
      >
        <ImageBrokenVariantIcon
          style={{
            fontSize: '4rem',
            marginBottom: '0.5rem',
            opacity: 0.5,
          }}
        />
        <Typography variant='h2' component='h1'>
          Page not found
        </Typography>
        <Typography sx={{ mb: 2 }}>
          The page you requested does not exist.
        </Typography>
        <Button component={Link} to={link || '/'} sx={{ mx: 'auto' }}>
          Go home
        </Button>
      </Paper>
    </Box>
  </>
);

export default NotFound;
