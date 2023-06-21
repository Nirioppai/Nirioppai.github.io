import { Alert, AlertTitle } from '@mui/material';

const ErrorAlert = () => (
  <Alert severity='error'>
    <AlertTitle>Error</AlertTitle>
    Something went wrong while loading this page. Please try again later.
  </Alert>
);

export default ErrorAlert;
