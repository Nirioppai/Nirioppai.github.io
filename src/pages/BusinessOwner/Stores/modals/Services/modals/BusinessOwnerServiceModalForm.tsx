import { TextFieldElement } from 'react-hook-form-mui';

import { NumberFieldElement, SelectDropdownElement } from '~/components';

const BusinessOwnerServiceModalForm = () => (
  <>
    <TextFieldElement name='name' label='Service Name' required />
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

export default BusinessOwnerServiceModalForm;
