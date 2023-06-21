import { TextFieldElement } from 'react-hook-form-mui';

const BusinessOwnerCashierModalForm = () => (
  <>
    <TextFieldElement name='name' label='Cashier Name' required />
    <TextFieldElement name='password' label='Cashier Password' required />
  </>
);

export default BusinessOwnerCashierModalForm;
