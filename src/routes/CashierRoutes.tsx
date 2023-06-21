import { Navigate, Route, Routes } from 'react-router-dom';

import { CashierSales, CashierStore, NotFound } from '~/pages';
import { ProtectedRoute } from '~/routes';

const BusinessOwnerRoutes = () => (
  <Routes>
    <Route element={<ProtectedRoute userType='cashier' />}>
      <Route path='' element={<Navigate replace to='/cashier/store' />} />
      <Route path='/store' element={<CashierStore />} />
      <Route path='/sales' element={<CashierSales />} />

      <Route
        path='*'
        element={<NotFound link='/cashier' height='calc(100vh - 112px)' />}
      />
    </Route>
  </Routes>
);

export default BusinessOwnerRoutes;
