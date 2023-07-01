import { FC } from 'react';

import { Box, Grid, Typography } from '@mui/material';

import { Chart, Section } from '~/components';
const PieChart: FC<{ invoices: any; isLoading: any }> = ({
  invoices,
  isLoading,
}) => {
  const customerFrequencies = invoices.reduce((accum: any, store: any) => {
    store.invoices.forEach((invoice: any) => {
      const name = invoice.customerName;
      accum[name] = (accum[name] || 0) + 1;
    });
    return accum;
  }, {});

  const chartData = Object.entries(customerFrequencies).map(
    ([name, value]) => ({
      value,
      name,
    })
  );

  const option = {
    tooltip: {
      trigger: 'item',
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        magicType: { show: true, type: ['line', 'bar'] },
        saveAsImage: { show: true },
      },
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    grid: {
      top: 80,
      left: 20,
      right: 20,
      bottom: 80,
      containLabel: true,
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        labelLine: {
          show: false,
        },
        data: chartData,
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
            {option && (
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
export default PieChart;
