import { FC, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  //  Typography
} from '@mui/material';
import {
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  Google as GoogleIcon,
} from 'mdi-material-ui';
import { useSnackbar } from 'notistack';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { TextFieldElement } from 'react-hook-form-mui';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { AuthBase, FormContainer } from '~/components';
import { UserAuth } from '~/contexts';
import { LoginSchema, loginSchema } from '~/schemas';

interface LoginProps {
  userType: {
    label: string;
    value: string;
  };
}

const Login: FC<LoginProps> = ({ userType }) => {
  // @ts-ignore
  const { googleSignIn, signIn } = UserAuth();

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);

  const formContext = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = formContext;

  // @ts-ignore
  const onSubmit = async (values: LoginSchema) => {
    try {
      await signIn(values.email, values.password);
      navigate(`/${userType.value}`);
    } catch (e) {
      enqueueSnackbar('Something went wrong.', { variant: 'error' });
      // @ts-ignore
      console.error(e.message);
    }

    // TODO: LOGIN SERVICE
    // try {
    //   // pag yung current route is pang supervisor tapos yung usertype faculty, throw error
    //   const data = await authService.login({
    //     ...values,
    //     userType: userType.value,
    //   });
    //   localStorage.setItem('accessToken', data.accessToken);
    //   localStorage.setItem('refreshToken', data.refreshToken);
    //   navigate(`/${userType.value}`, { replace: true });
    // } catch (err: any) {
    //   enqueueSnackbar(err?.response?.data?.message || 'Something went wrong.', {
    //     variant: 'error',
    //   });
    // }
  };

  async function onGoogleClick() {
    try {
      await googleSignIn(userType.value);
      navigate('/businessOwner/stores');
    } catch (error) {
      enqueueSnackbar('Could not authorize with Google.', { variant: 'error' });
    }
  }

  return (
    <AuthBase>
      <Helmet title={`${userType.label} Login`} />
      {/* <Typography sx={{ textAlign: 'center', mb: 4 }}>
        Sign in to start your session!
      </Typography> */}

      {location.pathname === '/login/businessOwner' && (
        <>
          <LoadingButton
            onClick={onGoogleClick}
            startIcon={<GoogleIcon />}
            type='button'
            fullWidth
          >
            Sign in with Google
          </LoadingButton>
          <Divider sx={{ mt: 2, mb: 2 }} orientation='horizontal'>
            or
          </Divider>
        </>
      )}

      <FormContainer
        formContext={formContext}
        // @ts-ignore
        handleSubmit={handleSubmit(onSubmit)}
      >
        <TextFieldElement name='email' label='Email' required />
        <TextFieldElement
          name='password'
          label='Password'
          type={showPassword ? 'text' : 'password'}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={() => setShowPassword((v) => !v)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge='end'
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <CreateAccountGrid>
          <LoadingButton
            type='submit'
            loading={isSubmitting}
            fullWidth={
              location.pathname === '/login/businessOwner' ? false : true
            }
          >
            Sign in
          </LoadingButton>
        </CreateAccountGrid>
      </FormContainer>
    </AuthBase>
  );
};

function CreateAccountGrid({ children }: any) {
  const location = useLocation();
  return (
    <>
      {location.pathname === '/login/businessOwner' ? (
        <>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <Button
                variant='outlined'
                component={Link}
                to={'/register/businessOwner'}
              >
                Create Account
              </Button>
            </Grid>
            <Grid container item xs={6} justifyContent='flex-end'>
              {children}
            </Grid>
          </Grid>
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
}

export default Login;
