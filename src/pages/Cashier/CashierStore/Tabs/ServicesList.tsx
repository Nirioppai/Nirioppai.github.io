import { FC, PropsWithChildren, useEffect } from 'react';

import { Chip } from '@mui/material';
import {
  Alert as AlertIcon,
  CheckBold as CheckBoldIcon,
} from 'mdi-material-ui';
import { useQueries } from 'react-query';
import { getRecoil } from 'recoil-nexus';

import { DynamicAgGrid } from '~/components';
import { cashierSelectedStore } from '~/configs';
import { KEYS } from '~/constants';
import { servicesService } from '~/services';

interface ServicesListProps {
  disableWrite?: boolean;
  handleServiceClick?: any;
  selectedItems?: any;
}

const ServicesList: FC<PropsWithChildren<ServicesListProps>> = ({
  disableWrite,
  handleServiceClick,
  selectedItems,
}) => {
  const storeId = getRecoil(cashierSelectedStore);

  const queries = useQueries([
    {
      queryKey: [KEYS.services, storeId],
      queryFn: () => servicesService.getCashierServicesInStore(storeId),
    },
  ]);

  // @ts-ignore
  const services = queries[0]?.data || [];

  // @ts-ignore
  const isLoading = queries.some((q) => q.isLoading);
  // @ts-ignore
  const isError = queries.some((q) => q.isError);

  useEffect(() => {
    queries.forEach((q) => q.refetch());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems]);

  return (
    <>
      <DynamicAgGrid
        searchBarWidth={'100%'}
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
          {
            headerName: '',
            field: 'actions',
            sortable: false,
            filter: false,
            cellRenderer: 'buttonRenderer',
            cellRendererParams: {
              onClick: handleServiceClick,
              label: 'Click me',
            },
            minWidth: 83,
            maxWidth: 83,
          },
        ]}
        isLoading={isLoading}
        isError={isError}
        actions={{
          add: disableWrite,
          edit: disableWrite,
          archive: disableWrite,
        }}
      />
    </>
  );
};

export default ServicesList;
