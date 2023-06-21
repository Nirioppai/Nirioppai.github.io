// import { Stack } from '@mui/material';

import BusinessOwnerStoreModalForm from '../BusinessOwnerStoreModalForm';

import { FormContainerComponent, Section } from '~/components';
import { storeSchema } from '~/schemas';

const StoreOverviewGrid = ({
  defaultValues,
  schema,
  onSubmit,
}: {
  defaultValues: any;
  schema: typeof storeSchema;
  onSubmit: any;
}) => {
  return (
    <div>
      <FormContainerComponent
        defaultValues={defaultValues}
        schema={schema}
        onFormSubmit={onSubmit}
      >
        <Section gutterBottom>
          <BusinessOwnerStoreModalForm />
        </Section>
      </FormContainerComponent>
    </div>
  );
};

export default StoreOverviewGrid;
