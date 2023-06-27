import { FC } from 'react';

import { Chip } from '@mui/material';
import {
  Alert as AlertIcon,
  CheckBold as CheckBoldIcon,
} from 'mdi-material-ui';
import { useQueries } from 'react-query';

import { AddExistingServiceModal, AddOwnerServiceModal } from './modals';

import { DynamicAgGrid } from '~/components';
import { KEYS } from '~/constants';
import { servicesService } from '~/services';

type StoreServicesGridProps = {
  disableWrite?: boolean;
  storeId: string;
};

const StoreServicesGrid: FC<StoreServicesGridProps> = ({
  disableWrite,
  storeId,
}) => {
  const queries = useQueries([
    {
      queryKey: [KEYS.services, 'Store Services'],
      queryFn: () => servicesService.getServicesInStore(storeId || ''),
    },
  ]);

  const services = queries[0].data || [];

  // @ts-ignore
  const isLoading = queries.some((q) => q.isLoading);

  // @ts-ignore
  const isError = queries.some((q) => q.isError);

  return (
    <>
      <DynamicAgGrid
        rowData={services}
        columnDefs={[
          {
            field: 'name',
            headerName: 'Name',
            sort: 'asc',
            minWidth: 200,
            cellStyle: { fontWeight: 500 },
          },
          {
            field: 'price',
            headerName: 'Price',

            minWidth: 100,
          },

          {
            field: 'category',
            headerName: 'Category',

            minWidth: 150,
          },
          {
            field: 'description',
            headerName: 'Description',

            minWidth: 250,
          },
          {
            field: 'availability',
            headerName: 'Availability',
            cellRenderer: (params: any) => {
              const availability = params.data.availability;

              let color = 'success';
              let IconComponent = CheckBoldIcon;

              if (availability == 'Unavailable') {
                color = 'error';
                IconComponent = AlertIcon;
              }
              return (
                <div>
                  <Chip
                    icon={<IconComponent />}
                    // @ts-ignore
                    color={color}
                    size='small'
                    variant='filled'
                    label={availability}
                  />
                </div>
              );
            },

            minWidth: 250,
          },
        ]}
        isLoading={isLoading}
        isError={isError}
        actions={{
          add: !disableWrite,
          addAnother: !disableWrite,
          edit: disableWrite,
          archive: disableWrite,
        }}
        addText='Add New Service'
        addAnotherText='Add From Existing Services'
        // onArchive={async (row) => await archiveEntry(row._id)}
        AddModal={AddOwnerServiceModal}
        AddAnotherModal={AddExistingServiceModal}
        // EditModal={EditOwnerServiceModal}
      />
    </>
  );
};

export default StoreServicesGrid;
