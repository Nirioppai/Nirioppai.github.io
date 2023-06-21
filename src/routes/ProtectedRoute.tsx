import { FC } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStatus } from '../hooks/useAuthStatus';

import { Spinner, UserWrapper } from '~/components';

const ProtectedRoute: FC<{ userType: string }> = ({ userType }) => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return <Spinner />;
  }

  return loggedIn ? (
    <UserWrapper userType={userType}>
      <Outlet />
    </UserWrapper>
  ) : (
    <Navigate to='/login' />
  );
};

export default ProtectedRoute;
