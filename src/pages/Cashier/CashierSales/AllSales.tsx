import { FC, PropsWithChildren } from 'react';

import { useQueries } from 'react-query';
import { getRecoil } from 'recoil-nexus';

import { DynamicAgGrid } from '~/components';
import { cashierSelectedStore } from '~/configs';
import { KEYS } from '~/constants';
import { invoiceService } from '~/services';

interface AllSalesItemsGridProps {
  disableWrite?: boolean;
}

const AllSales: FC<PropsWithChildren<AllSalesItemsGridProps>> = ({
  disableWrite,
}) => {
  const storeId = getRecoil(cashierSelectedStore);

  const queries = useQueries(
    // @ts-ignore
    storeId
      ? [
          {
            queryKey: [KEYS.invoices, storeId],
            queryFn: () => invoiceService.getInvoices(storeId),
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

  console.log(disableWrite);
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
            field: 'productSaleId',
            headerName: 'Transaction Type',
            valueGetter: ({ data }) =>
              data.productSaleId != 'no-sale' && data.serviceSaleId == 'no-sale'
                ? 'Product Sale'
                : data.serviceSaleId != 'no-sale' &&
                  data.productSaleId == 'no-sale'
                ? 'Service Sale'
                : 'Product & Service Sale',
            minWidth: 150,
          },
          {
            field: 'status',
            headerName: 'Status',

            minWidth: 150,
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

export default AllSales;
