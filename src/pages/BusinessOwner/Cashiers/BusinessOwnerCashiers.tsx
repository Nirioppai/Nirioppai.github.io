import { FC, PropsWithChildren } from 'react';

import OwnerCashiersGrid from './OwnerCashiersGrid';
// import EquipmentImport from './EquipmentImport';

import {
  PageContentWrapper,
  // TabWithContent
} from '~/components';

const BusinessOwnerCashiers: FC<
  PropsWithChildren<{ disableWrite?: boolean }>
> = ({ disableWrite }) => {
  return (
    <PageContentWrapper title='Cashiers'>
      {/* <TabWithContent
        tabItems={[
          {
            name: 'Overview',
            content: <OwnerCashiersGrid disableWrite={disableWrite} />,
          },
        ]}
      /> */}
      <OwnerCashiersGrid disableWrite={disableWrite} />
    </PageContentWrapper>
  );
};

export default BusinessOwnerCashiers;
