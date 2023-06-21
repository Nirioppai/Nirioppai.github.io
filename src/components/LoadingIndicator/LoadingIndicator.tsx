import { Box, CircularProgress } from '@mui/material';

const LoadingIndicator = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <CircularProgress />
  </Box>
);

export default LoadingIndicator;
