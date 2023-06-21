import { FC, PropsWithChildren } from 'react';

import OwnerProductCategoriesGrid from './OwnerProductCategoriesGrid';
// import EquipmentImport from './EquipmentImport';

import { PageContentWrapper, TabWithContent } from '~/components';

const BusinessOwnerCategorys: FC<
  PropsWithChildren<{ disableWrite?: boolean }>
> = ({ disableWrite }) => {
  return (
    <PageContentWrapper title='Categories'>
      <TabWithContent
        tabItems={[
          {
            name: 'Product Categories',
            content: <OwnerProductCategoriesGrid disableWrite={disableWrite} />,
          },
        ]}
      />
    </PageContentWrapper>
  );
};

export default BusinessOwnerCategorys;
