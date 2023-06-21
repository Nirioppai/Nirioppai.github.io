import { useTheme } from '@mui/material';
import {
  blue,
  blueGrey,
  brown,
  cyan,
  deepOrange,
  green,
  grey,
  lime,
  orange,
  purple,
  red,
  teal,
} from '@mui/material/colors';

interface UseChartThemeParams {
  contained?: boolean;
  titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const useChartTheme = ({
  contained = false,
  titleVariant = 'h3',
}: UseChartThemeParams) => {
  const theme = useTheme();

  const colorPalette =
    theme.palette.mode === 'dark'
      ? [
          blue[200],
          red[200],
          lime[200],
          purple[200],
          deepOrange[200],
          green[200],
          brown[200],
          orange[200],
          cyan[200],
          teal[200],
          blueGrey[200],
        ]
      : [
          blue[500],
          red[500],
          lime[500],
          purple[500],
          deepOrange[500],
          green[500],
          brown[500],
          orange[500],
          cyan[500],
          teal[500],
          blueGrey[500],
        ];

  const axisCommon = {
    axisLine: {
      lineStyle: {
        color: theme.palette.mode === 'dark' ? grey[700] : grey[800],
      },
    },
    axisTick: {
      lineStyle: {
        color: theme.palette.divider,
      },
    },
    axisLabel: {
      color: theme.palette.text.secondary,
    },
    splitLine: {
      lineStyle: {
        color: theme.palette.divider,
      },
    },
    splitArea: {
      areaStyle: {
        color: theme.palette.divider,
      },
    },
  };

  const chartTheme = {
    color: colorPalette,
    backgroundColor: contained ? theme.palette.background.paper : 'transparent',
    tooltip: {
      backgroundColor: theme.palette.background.paper,
      borderColor: theme.palette.divider,
      textStyle: {
        color: theme.palette.text.primary,
      },
    },
    legend: {
      textStyle: {
        color: theme.palette.text.secondary,
      },
    },
    textStyle: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
      color: theme.palette.text.secondary,
    },
    title: {
      padding: '5px 0 0',
      textStyle: {
        fontSize: theme.typography[titleVariant].fontSize,
        fontWeight: theme.typography[titleVariant].fontWeight,
        color: theme.palette.text.primary,
      },
      subtextStyle: {
        color: theme.palette.text.secondary,
      },
    },
    toolbox: {
      iconStyle: {
        borderColor: theme.palette.text.secondary,
      },
    },
    dataZoom: {
      textStyle: {
        color: theme.palette.text.secondary,
      },
    },
    timeline: {
      lineStyle: {
        color: theme.palette.text.secondary,
      },
      itemStyle: {
        color: colorPalette[1],
      },
      label: {
        color: theme.palette.text.secondary,
      },
      controlStyle: {
        color: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
      },
    },
    timeAxis: axisCommon,
    logAxis: axisCommon,
    valueAxis: axisCommon,
    categoryAxis: axisCommon,
    line: {
      symbol: 'circle',
      symbolSize: theme.spacing(1),
    },
    graph: {
      color: colorPalette,
    },
    gauge: {
      title: {
        textStyle: {
          color: theme.palette.text.secondary,
        },
      },
    },
    candlestick: {
      itemStyle: {
        normal: {
          color: colorPalette[0],
          color0: colorPalette[1],
          borderColor: colorPalette[0],
          borderColor0: colorPalette[1],
        },
      },
    },
  };

  return chartTheme;
};
