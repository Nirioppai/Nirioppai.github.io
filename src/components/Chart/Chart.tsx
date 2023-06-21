import React, { FC } from 'react';

import { Box } from '@mui/material';
import type { BoxProps } from '@mui/material';
// @ts-ignore
import EChartsReact, { EChartsReactProps } from 'echarts-for-react/lib';

import { useChartTheme } from './useChartTheme';

import { Section } from '~/components';
import type { SectionProps } from '~/components';

export interface ChartProps extends EChartsReactProps {
  /**
   * Props applied to the wrapper (Box) component.
   */
  BoxProps?: BoxProps;
  /**
   * Props applied to the Section component if `contained` is `true`.
   */
  SectionProps?: SectionProps;
  /**
   * Wrap the chart with a SectionWrapper component.
   */
  contained?: boolean;
  /**
   * Set the title style based on header sizes.
   */
  titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  option: any;
  style?: any;
  theme?: any;
}

/**
 * Modified chart component based on `echarts-for-react`.
 * See [ECharts](https://echarts.apache.org/en/api.html) and
 * [echarts-for-react](https://github.com/hustcc/echarts-for-react#readme)
 * docs for further documentation. Full list of available charts can be
 * found [here](https://echarts.apache.org/examples/en/index.html).
 *
 * Rest of props go directly to the `EChartsReact` component.
 */
const Chart: FC<ChartProps> = ({
  BoxProps,
  SectionProps,
  contained = false,
  option,
  style,
  theme,
  titleVariant = 'h3',
  ...rest
}) => {
  const chartTheme = useChartTheme({ contained, titleVariant });

  const chartComponent = (
    <EChartsReact
      {...rest}
      option={option}
      theme={theme || chartTheme}
      // Compensation for title padding
      style={{ marginTop: option.title ? -5 : 0, ...style }}
    />
  );

  return (
    <Box {...BoxProps}>
      {contained ? (
        <Section {...SectionProps}>{chartComponent}</Section>
      ) : (
        chartComponent
      )}
    </Box>
  );
};

export default Chart;
