import { Navigate, Route, Routes } from 'react-router-dom';

import {
  BusinessOwnerCashiers,
  BusinessOwnerCategories,
  BusinessOwnerProducts,
  BusinessOwnerServices,
  BusinessOwnerStores,
  NotFound,
} from '~/pages';
import { ProtectedRoute } from '~/routes';

const BusinessOwnerRoutes = () => (
  <Routes>
    <Route element={<ProtectedRoute userType='businessOwner' />}>
      <Route
        path=''
        element={<Navigate replace to='/businessOwner/stores' />}
      />
      <Route path='/stores' element={<BusinessOwnerStores />} />

      <Route path='/products' element={<BusinessOwnerProducts />} />
      <Route path='/services' element={<BusinessOwnerServices />} />
      <Route path='/categories' element={<BusinessOwnerCategories />} />
      <Route path='/cashiers' element={<BusinessOwnerCashiers />} />

      <Route
        path='*'
        element={
          <NotFound link='/businessOwner' height='calc(100vh - 112px)' />
        }
      />
    </Route>
  </Routes>
);

export default BusinessOwnerRoutes;
