import { FC, useMemo } from 'react';

import { Grid } from '@mui/material';
import { useQueries } from 'react-query';

import BarGraph from './BarGraph';
import MultiLineGraph from './MultiLineGraph';
import PieChart from './PieChart';

import { PageContentWrapper } from '~/components';
import { KEYS } from '~/constants';
import { invoiceService } from '~/services';

const BusinessOwnerSales: FC = () => {
  const queries = useQueries([
    {
      queryKey: KEYS.invoices,
      queryFn: () => invoiceService.getOwnerInvoices(),
    },
  ]);

  const invoices = useMemo(() => queries[0].data || [], [queries]);

  const isLoading = queries.some((q) => q.isLoading);
  // const isSuccess = queries.every((q) => q.isSuccess);

  return (
    <PageContentWrapper title='Sales'>
      <MultiLineGraph invoices={invoices} isLoading={isLoading} />

      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <BarGraph invoices={invoices} isLoading={isLoading} />
        </Grid>
        <Grid item xs={8}>
          <PieChart invoices={invoices} isLoading={isLoading} />
        </Grid>
      </Grid>
    </PageContentWrapper>
  );
};

export default BusinessOwnerSales;
