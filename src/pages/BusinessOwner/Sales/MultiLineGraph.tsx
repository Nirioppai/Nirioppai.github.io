import { FC, useEffect, useState } from 'react';

import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

import { Chart, Section } from '~/components';

const MultiLineGraph: FC<{ invoices: any; isLoading: any }> = ({
  invoices,
  isLoading,
}) => {
  const [selectedFilter, setSelectedFilter] = useState('Month');
  const [numberOfDays, setNumberOfDays] = useState(1);

  const colors = ['#5470C6', '#EE6666'];

  useEffect(() => {
    switch (selectedFilter) {
      case 'Today':
        setNumberOfDays(1);

        break;

      case 'Week':
        setNumberOfDays(7);

        break;

      case 'Month':
        setNumberOfDays(31);

        break;

      case 'Quarter':
        setNumberOfDays(92);

        break;

      case 'Year':
        setNumberOfDays(365);

        break;

      default:
        console.error('Invalid filter selected');
    }
  }, [selectedFilter]);

  const generateSubtotalForPeriod = (days: number) => {
    const dailyProductSubtotal = new Array(days).fill(0);
    const dailyServiceSubtotal = new Array(days).fill(0);

    invoices.forEach((store: any) => {
      store.invoices.forEach((invoice: any) => {
        const date = new Date(invoice.timestamp);

        const dayOfMonth = date.getUTCDate() - 1;

        if (dayOfMonth < days) {
          dailyProductSubtotal[dayOfMonth] +=
            invoice.productSaleId === 'no-sale'
              ? 0
              : invoice.productSale.subtotal;
          dailyServiceSubtotal[dayOfMonth] +=
            invoice.serviceSaleId === 'no-sale'
              ? 0
              : invoice.serviceSale.subtotal;
        }
      });
    });

    return {
      color: colors,
      legend: {},
      tooltip: {
        trigger: 'none',
        axisPointer: {
          type: 'cross',
        },
      },
      grid: {
        top: 80,
        left: 20,
        right: 20,
        bottom: 0,
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: colors[0],
            },
          },
          axisPointer: {
            label: {
              formatter: function (params: any) {
                return (
                  'Product Sales Amount ' +
                  params.value +
                  `th Day of ${selectedFilter} ` +
                  (params.seriesData.length
                    ? '：' + params.seriesData[0].data
                    : '')
                );
              },
            },
          },

          data: [...Array(days).keys()],
        },
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: colors[1],
            },
          },
          axisPointer: {
            label: {
              formatter: function (params: any) {
                return (
                  'Service Sales Amount ' +
                  params.value +
                  `th Day of ${selectedFilter} ` +
                  (params.seriesData.length
                    ? '：' + params.seriesData[0].data
                    : '')
                );
              },
            },
          },

          data: [...Array(days).keys()],
        },
      ],

      yAxis: {
        type: 'value',
      },

      series: [
        {
          name: 'Product Sales',
          type: 'line',
          xAxisIndex: 1,
          smooth: true,
          emphasis: {
            focus: 'series',
          },
          data: dailyProductSubtotal,
        },
        {
          name: 'Service Sales',
          type: 'line',
          smooth: true,
          emphasis: {
            focus: 'series',
          },
          data: dailyServiceSubtotal,
        },
      ],
    };
  };

  const lastNumberOfDays = generateSubtotalForPeriod(numberOfDays);

  const changeValue = (e: any) => {
    //returning the schoolyear obj
    const currentFilter = e.target.value;

    setSelectedFilter(currentFilter);
  };

  console.log(invoices);

  const hourlyProductSubtotal = new Array(24).fill(0);
  const hourlyServiceSubtotal = new Array(24).fill(0);

  invoices.forEach((store: any) => {
    store.invoices.forEach((invoice: any) => {
      // Convert the timestamp to a Date object
      const date = new Date(invoice.timestamp);

      // Get the hour of the day
      const hourOfDay = date.getUTCHours();

      // Add the subtotal to the appropriate hour of the day
      hourlyProductSubtotal[hourOfDay] +=
        invoice.productSaleId === 'no-sale' ? 0 : invoice.productSale.subtotal;

      hourlyServiceSubtotal[hourOfDay] +=
        invoice.serviceSaleId === 'no-sale' ? 0 : invoice.serviceSale.subtotal;
    });
  });

  // Create labels for hours
  const productHourLabels = [...Array(24).keys()].map((hour) => {
    return `${hour} H`;
  });

  const serviceHourLabels = [...Array(24).keys()].map((hour) => {
    return `${hour} H`;
  });

  // Now we can construct the chart option
  const last24Hours = {
    color: colors,
    tooltip: {
      trigger: 'none',
      axisPointer: {
        type: 'cross',
      },
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      top: 80,
      left: 20,
      right: 20,
      bottom: 0,
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: colors[0],
          },
        },
        axisPointer: {
          label: {
            formatter: function (params: any) {
              return (
                'Product Sales Amount Within' +
                params.value +
                ' Hour(s) ' +
                (params.seriesData.length
                  ? '：' + params.seriesData[0].data
                  : '')
              );
            },
          },
        },
        data: Object.keys(productHourLabels), // This will be the labels for hours of the day
      },
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: colors[1],
          },
        },
        axisPointer: {
          label: {
            formatter: function (params: any) {
              return (
                'Service Sales Amount Within' +
                params.value +
                ' Hour(s) ' +
                (params.seriesData.length
                  ? '：' + params.seriesData[0].data
                  : '')
              );
            },
          },
        },
        data: Object.keys(serviceHourLabels), // This will be the labels for hours of the day
      },
    ],
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: Object.values(hourlyProductSubtotal), // This will be the sum of subtotals for each hour
        name: 'Product Sales',
        type: 'line',
        xAxisIndex: 1,
        smooth: true,
        emphasis: {
          focus: 'series',
        },
      },
      {
        data: Object.values(hourlyServiceSubtotal), // This will be the sum of subtotals for each hour
        name: 'Service Sales',
        type: 'line',
        smooth: true,
        emphasis: {
          focus: 'series',
        },
      },
    ],
  };

  const weeklyProductSubtotal = {
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
    Sun: 0,
  };

  const weeklyServiceSubtotal = {
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
    Sun: 0,
  };

  invoices.forEach((store: any) => {
    store.invoices.forEach((invoice: any) => {
      // Convert the timestamp to a Date object
      const date = new Date(invoice.timestamp);

      // Get the day of the week
      const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
        date.getUTCDay()
      ];

      // Add the subtotal to the appropriate day of the week
      // @ts-ignore
      weeklyProductSubtotal[dayOfWeek] +=
        invoice.productSaleId === 'no-sale' ? 0 : invoice.productSale.subtotal;

      // @ts-ignore
      weeklyServiceSubtotal[dayOfWeek] +=
        invoice.serviceSaleId === 'no-sale' ? 0 : invoice.serviceSale.subtotal;
    });
  });

  // Now we can construct the chart option
  const last7Days = {
    color: colors,
    tooltip: {
      trigger: 'none',
      axisPointer: {
        type: 'cross',
      },
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      top: 80,
      left: 20,
      right: 20,
      bottom: 0,
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: colors[0],
          },
        },
        axisPointer: {
          label: {
            formatter: function (params: any) {
              return (
                'Product Sales Amount  ' +
                params.value +
                (params.seriesData.length
                  ? '：' + params.seriesData[0].data
                  : '')
              );
            },
          },
        },
        data: Object.keys(weeklyProductSubtotal), // This will be the days of the week
      },
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: colors[1],
          },
        },
        axisPointer: {
          label: {
            formatter: function (params: any) {
              return (
                'Service Sales Amount  ' +
                params.value +
                (params.seriesData.length
                  ? '：' + params.seriesData[0].data
                  : '')
              );
            },
          },
        },
        data: Object.keys(weeklyServiceSubtotal), // This will be the days of the week
      },
    ],
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: Object.values(weeklyProductSubtotal), // This will be the sum of subtotals for each day
        name: 'Product Sales',
        type: 'line',
        smooth: true,
        emphasis: {
          focus: 'series',
        },
      },
      {
        data: Object.values(weeklyServiceSubtotal), // This will be the sum of subtotals for each day
        name: 'Service Sales',
        type: 'line',
        smooth: true,
        emphasis: {
          focus: 'series',
        },
      },
    ],
  };

  return (
    <div>
      <Box sx={{ marginBottom: '16px' }}>
        <Section>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={12}>
              <Typography variant='h3' sx={{ marginTop: '10.5px' }}>
                Product and Service Sales Report
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <FormControl size='small'>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  value={selectedFilter}
                  label='Filter'
                  onChange={changeValue}
                >
                  <MenuItem value={'Today'}>Last 24 Hours</MenuItem>
                  <MenuItem value={'Week'}>Last 7 Days</MenuItem>
                  <MenuItem value={'Month'}>Last 31 Days</MenuItem>
                  <MenuItem value={'Quarter'}>Last 92 Days</MenuItem>
                  <MenuItem value={'Year'}>Last 365 Days</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Typography
            variant='subtitle2'
            sx={{ color: '#A3A3AA', marginTop: '-15px' }}
          >
            {selectedFilter}
          </Typography>
          <Box>
            {selectedFilter && (
              <Chart
                showLoading={isLoading}
                option={
                  selectedFilter === 'Today'
                    ? last24Hours
                    : selectedFilter === 'Week'
                    ? last7Days
                    : selectedFilter === 'Month'
                    ? lastNumberOfDays
                    : selectedFilter === 'Quarter'
                    ? lastNumberOfDays
                    : selectedFilter === 'Year'
                    ? lastNumberOfDays
                    : []
                }
                style={{ height: '400px' }}
              />
            )}
          </Box>
        </Section>
      </Box>
    </div>
  );
};

export default MultiLineGraph;
