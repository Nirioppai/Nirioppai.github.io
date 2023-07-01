import { FC } from 'react';

import { Box, Grid, Typography } from '@mui/material';

import { Chart, Section } from '~/components';
const BarGraph: FC<{ invoices: any; isLoading: any }> = ({
  invoices,
  isLoading,
}) => {
  const categoryCounts = {};

  // Assuming 'stores' is the array containing your store data
  invoices.forEach((store: any) => {
    if (store.invoices) {
      store.invoices.forEach((invoice: any) => {
        if (invoice.productSale && invoice.productSale.products) {
          invoice.productSale.products.forEach((product: any) => {
            const category = product.category
              ? product.category
              : 'No Category';
            if (category) {
              if (category in categoryCounts) {
                // @ts-ignore
                categoryCounts[category] += 1;
              } else {
                // @ts-ignore
                categoryCounts[category] = 1;
              }
            }
          });
        }
      });
    }
  });

  const categories = Object.keys(categoryCounts);
  const counts = Object.values(categoryCounts);

  console.log('categories', categories);
  console.log('counts', counts);

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          show: true,
        },
      },
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        magicType: { show: true, type: ['line', 'bar'] },
        saveAsImage: { show: true },
      },
    },
    grid: {
      top: 80,
      left: 20,
      right: 20,
      bottom: 0,
      containLabel: true,
    },
    calculable: true,
    xAxis: {
      type: 'category',
      data: categories,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: counts,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
      },
    ],
  };

  return (
    <>
      <Box sx={{ marginBottom: '16px' }}>
        <Section>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={16}>
              <Typography variant='h3' sx={{ marginTop: '10.5px' }}>
                Category Sales Report
              </Typography>
            </Grid>
          </Grid>

          <Box>
            {categories && (
              <Chart
                showLoading={isLoading}
                option={option}
                style={{ height: '400px' }}
              />
            )}
          </Box>
        </Section>
      </Box>
    </>
  );
};
export default BarGraph;
