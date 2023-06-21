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
            queryKey: [KEYS.invoices, storeId, 'all'],
            queryFn: () => invoiceService.getInvoices(storeId),
          },
        ]
      : []
  );

  // @ts-ignore
  const invoices = queries[0]?.data || [];

  console.log(invoices);

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
            field: 'totalAmount',
            headerName: 'Total Amount',
            valueGetter: ({ data }) => 'PHP ' + data.totalAmount,
            maxWidth: 150,
          },
          {
            field: 'totalAmount',
            headerName: 'Number of Items',
            valueGetter: ({ data }) =>
              (data?.serviceSale?.services
                ? data?.serviceSale?.services.length
                : 0) +
              (data?.productSale?.products
                ? data?.productSale?.products.length
                : 0),
            maxWidth: 170,
          },
          {
            field: 'paymentType',
            headerName: 'Payment Type',
            valueGetter: ({ data }) =>
              data.paymentType ? data.paymentType : 'N/A',
            maxWidth: 160,
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
          view: !disableWrite,
        }}
      />
    </>
  );
};

export default AllSales;
