import { FC, PropsWithChildren } from 'react';

import { Chip } from '@mui/material';
import {
  Alert as AlertIcon,
  CheckBold as CheckBoldIcon,
  Information as InformationIcon,
} from 'mdi-material-ui';
import { useQueries } from 'react-query';
import { getRecoil } from 'recoil-nexus';

import { DynamicAgGrid } from '~/components';
import { cashierSelectedStore } from '~/configs';
import { KEYS } from '~/constants';
import { invoiceService } from '~/services';

interface ServiceSalesProps {
  disableWrite?: boolean;
}

const ServiceSales: FC<PropsWithChildren<ServiceSalesProps>> = ({
  disableWrite,
}) => {
  const storeId = getRecoil(cashierSelectedStore);

  const queries = useQueries(
    // @ts-ignore
    storeId
      ? [
          {
            queryKey: [KEYS.invoices, storeId, 'service'],
            queryFn: () => invoiceService.getServiceInvoices(storeId),
          },
        ]
      : []
  );

  // @ts-ignore
  const invoices = queries[0]?.data || [];

  // @ts-ignore
  const isLoading = queries.some((q) => q.isLoading);
  // @ts-ignore
  const isError = queries.some((q) => q.isError);

  return (
    <>
      <DynamicAgGrid
        searchBarWidth={'100%'}
        rowData={invoices}
        columnDefs={[
          {
            field: 'customerName',
            headerName: 'Customer Name',
            sort: 'asc',
            minWidth: 200,
            cellStyle: { fontWeight: 500 },
            valueGetter: ({ data }) =>
              data.customerName ? data.customerName : 'N/A',
          },
          {
            field: 'customerContact',
            headerName: 'Customer Contact Details',
            valueGetter: ({ data }) =>
              data.customerContact ? data.customerContact : 'N/A',
            minWidth: 150,
          },
          {
            field: 'paymentType',
            headerName: 'Payment Type',
            valueGetter: ({ data }) =>
              data.paymentType ? data.paymentType : 'N/A',
            minWidth: 150,
          },
          {
            field: 'serviceSaleId',
            headerName: 'Transaction Type',
            valueGetter: ({ data }) =>
              data.productSaleId != 'no-sale' && data.serviceSaleId == 'no-sale'
                ? 'Product Sale'
                : data.serviceSaleId != 'no-sale' &&
                  data.productSaleId == 'no-sale'
                ? 'Service Sale'
                : 'Product & Service Sale',
            minWidth: 180,
          },
          {
            field: 'status',
            headerName: 'Status',
            cellRenderer: (params: any) => {
              const status = params.data.status;

              let color = 'success';
              let IconComponent = CheckBoldIcon;

              if (status == 'Cancelled') {
                color = 'error';
                IconComponent = AlertIcon;
              } else if (status == 'Edited') {
                color = 'warning';
                IconComponent = InformationIcon;
              }
              return (
                <div>
                  <Chip
                    icon={<IconComponent />}
                    // @ts-ignore
                    color={color}
                    size='small'
                    variant='filled'
                    label={status}
                  />
                </div>
              );
            },

            minWidth: 250,
            maxWidth: 200,
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

export default ServiceSales;
