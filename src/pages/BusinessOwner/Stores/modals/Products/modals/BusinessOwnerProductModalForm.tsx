import { TextFieldElement } from 'react-hook-form-mui';

import { NumberFieldElement, SelectDropdownElement } from '~/components';

const BusinessOwnerProductModalForm = () => (
  <>
    <TextFieldElement name='name' label='Product Name' required />
    <NumberFieldElement name='price' label='Price' required />
    <TextFieldElement name='description' label='Description' />
    <SelectDropdownElement
      name='availability'
      label='Availability'
      labelKey='id'
      options={[{ id: 'Available' }, { id: 'Unavailable' }]}
      required
    />
  </>
);

export default BusinessOwnerProductModalForm;
