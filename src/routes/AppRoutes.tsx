import { Navigate, Route, Routes } from 'react-router-dom';

import { USER_TYPES } from '~/constants';
import {
  // ForgotPassword,
  Login,
  LoginSelect,
  Register,
  // NotFound,
  // ResetPassword,
} from '~/pages';
import { BusinessOwnerRoutes, CashierRoutes } from '~/routes';

function AppRoutes() {
  return (
    <>
      <Routes>
        {/* AUTH */}
        <Route path='/' element={<LoginSelect />} />
        <Route path='/login' element={<Navigate replace to='/' />} />
        <Route path='/register/businessOwner' element={<Register />} />
        {USER_TYPES.map((userType) => (
          <Route
            key={userType.value}
            path={`/login/${userType.value}`}
            element={<Login userType={userType} />}
          />
        ))}
        {/* USER TYPES */}
        <Route path='/businessOwner/*' element={<BusinessOwnerRoutes />} />
        <Route path='/cashier/*' element={<CashierRoutes />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
