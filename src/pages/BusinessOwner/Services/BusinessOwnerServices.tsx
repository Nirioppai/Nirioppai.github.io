import { FC, PropsWithChildren } from 'react';

import OwnerServicesGrid from './OwnerServicesGrid';
// import EquipmentImport from './EquipmentImport';

import {
  PageContentWrapper,
  // TabWithContent
} from '~/components';

const BusinessOwnerServices: FC<
  PropsWithChildren<{ disableWrite?: boolean }>
> = ({ disableWrite }) => {
  return (
    <PageContentWrapper title='Services'>
      {/* <TabWithContent
        tabItems={[
          {
            name: 'Overview',
            content: <OwnerServicesGrid disableWrite={disableWrite} />,
          },
        ]}
      /> */}
      <OwnerServicesGrid disableWrite={disableWrite} />
    </PageContentWrapper>
  );
};

export default BusinessOwnerServices;
