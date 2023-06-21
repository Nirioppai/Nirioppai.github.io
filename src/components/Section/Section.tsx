import React, { FC, PropsWithChildren } from 'react';

import { Paper } from '@mui/material';
import type { PaperProps } from '@mui/material';

export interface SectionProps extends PaperProps {
  /**
   * Use theme's original border-radius instead of a customized one (2x).
   */
  defaultBorderRadius?: boolean;
  /**
   * Add a bottom margin.
   */
  gutterBottom?: boolean;
}

/**
 * Custom Paper component that is used a section or part of the page.
 *
 * This takes care of the necessary styling (margin, padding, elevation, etc.).
 */
const Section: FC<PropsWithChildren<SectionProps>> = ({
  defaultBorderRadius = false,
  gutterBottom = false,
  ...rest
}) => (
  <Paper
    // TODO: revise this for customizability
    sx={[
      {
        p: {
          xs: 2,
          sm: 3,
        },
      },
      !defaultBorderRadius && { borderRadius: 2 },
      gutterBottom && { mb: 3 },
    ]}
    {...rest}
  />
);

export default Section;
