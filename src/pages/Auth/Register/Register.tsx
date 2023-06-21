import { useSnackbar } from 'notistack';
import { Helmet } from 'react-helmet-async';
import { TextFieldElement } from 'react-hook-form-mui';
import { useNavigate } from 'react-router-dom';

import { AuthBase, FormContainerComponent } from '~/components';
import { UserAuth } from '~/contexts';
import { RegisterSchema, registerSchema } from '~/schemas';
function Register() {
  const navigate = useNavigate();
  // @ts-ignore
  const { createUser } = UserAuth();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (values: RegisterSchema) => {
    try {
      await createUser(
        values.email,
        values.name,
        values.password,
        values.userType
      );
      // automatically redirect to account page after creating user
      navigate('/businessOwner/stores');
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || 'Something went wrong.', {
        variant: 'error',
      });
    }
  };

  return (
    <AuthBase>
      <Helmet title={'Business Owner Registration'} />
      Create your Business Owner Account
      <FormContainerComponent
        defaultValues={{
          name: '',
          email: '',
          password: '',
          userType: 'businessOwner',
        }}
        schema={registerSchema}
        onFormSubmit={onSubmit}
      >
        <TextFieldElement name='name' type='text' label='Full Name' required />
        <TextFieldElement name='email' type='email' label='Email' required />
        <TextFieldElement
          type='password'
          name='password'
          label='Password'
          required
        />
        <TextFieldElement
          type='password'
          name='confirmPassword'
          label='Confirm Password'
          required
        />
      </FormContainerComponent>
    </AuthBase>
  );
}

export default Register;
