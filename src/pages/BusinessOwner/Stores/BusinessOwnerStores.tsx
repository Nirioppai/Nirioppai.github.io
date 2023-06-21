import { FC, PropsWithChildren } from 'react';

import StoresGrid from './StoresGrid';
// import EquipmentImport from './EquipmentImport';

import {
  PageContentWrapper,
  // TabWithContent
} from '~/components';

const BusinessOwnerStores: FC<
  PropsWithChildren<{ disableWrite?: boolean }>
> = ({ disableWrite }) => {
  return (
    <PageContentWrapper title='Stores'>
      {/* <TabWithContent
        tabItems={[
          {
            name: 'Overview',
            content: <StoresGrid disableWrite={disableWrite} />,
          },
        ]}
      /> */}
      <StoresGrid disableWrite={disableWrite} />
    </PageContentWrapper>
  );
};

export default BusinessOwnerStores;
