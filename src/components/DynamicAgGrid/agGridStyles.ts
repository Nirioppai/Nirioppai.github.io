import { alpha } from '@mui/material';
import type { Theme } from '@mui/material';
import { purple } from '@mui/material/colors';

export const agGridStyles = (theme: Theme) => ({
  '& .ag-theme-custom': {
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100vh - 230px)',
    },
    height: 'calc(100vh - 225px)',
    '& *:not(.ag-custom-font-override *)': {
      color: theme.palette.text.primary,
      fontSize: theme.typography.body1.fontSize,
      '&:not(.ag-icon):not(.ag-radio-button-input-wrapper):not(.ag-checkbox-input-wrapper)':
        {
          fontFamily: theme.typography.fontFamily,
        },
    },
    '& .ag-root .ag-cell-focus': {
      userSelect: 'text',
    },
    '& .ag-checkbox-input-wrapper': {
      '&:after': {
        fontSize: 18,
        color: theme.palette.text.secondary,
      },
      '&.ag-checked': {
        '&:after': {
          color: theme.palette.primary.main,
        },
      },
    },
    '& .ag-root-wrapper': {
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius + 'px',
    },
    '& .ag-pinned-left-header': {
      borderColor: theme.palette.divider,
    },
    '& .ag-pinned-right-header': {
      borderColor: theme.palette.divider,
    },
    '& .ag-header': {
      backgroundColor: theme.palette.background.paper,
      borderColor: theme.palette.divider,
      '& .ag-header-cell': {
        transition: theme.transitions.create(['background-color'], {
          duration: theme.transitions.duration.shorter,
        }),
        '&:hover': {
          backgroundColor:
            alpha(theme.palette.text.primary, 0.15) + '!important',
        },
        '&.ag-header-cell-moving': {
          backgroundColor: alpha(theme.palette.text.primary, 0.15),
        },
        '& .ag-header-cell-label': {
          fontWeight: 500,
        },
      },
    },
    '& .ag-column-resizing': {
      backgroundColor: alpha(theme.palette.text.primary, 0.15) + '!important',
    },
    '& .ag-row': {
      backgroundColor: theme.palette.background.paper,
      borderColor: theme.palette.divider,
      // '&:last-child': {
      //   borderBottom: 'none',
      // },
    },
    '& .ag-floating-bottom': {
      borderColor: theme.palette.divider,
      '& *': {
        color: purple[700] + '!important',
      },
    },
    '& .ag-horizontal-left-spacer:not(.ag-scroller-corner)': {
      borderRightColor: 'transparent',
    },
    '& .ag-cell': {
      transition: theme.transitions.create(['background-color'], {
        duration: theme.transitions.duration.shorter,
      }),
      '&.ag-cell-last-left-pinned': {
        '&:not(.ag-cell-range-right)': {
          '&:not(.ag-cell-range-single-cell)': {
            borderRightColor: theme.palette.divider,
          },
        },
      },
      '&.ag-cell-first-right-pinned': {
        '&:not(.ag-cell-range-left)': {
          '&:not(.ag-cell-range-single-cell)': {
            borderLeftColor: theme.palette.divider,
          },
        },
      },
      '& .ag-cell-inline-editing': {
        borderColor: theme.palette.primary.main + '!important',
      },
    },
    '& .ag-cell-inline-editing': {
      height: 50,
      paddingLeft: 21,
      paddingRight: 21,
      backgroundColor: alpha(theme.palette.background.default, 0.75),
      '& .ag-text-field-input': {
        paddingBottom: 0,
      },
    },
    '& .ag-cell-focus': {
      borderColor: theme.palette.primary.main + '!important',
    },
    /* This CSS is to not apply the border for the column having 'no-border' class */
    '& .no-border': {
      border: 'none !important',
      outline: 'none !important',
    },
    '& .ag-menu': {
      color: theme.palette.text.primary + '!important',
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius + 'px',
      boxShadow: theme.shadows[3],
    },
    '& .ag-popup-child:not(.ag-tooltip-custom)': {
      boxShadow: theme.shadows[3],
    },
    '& .ag-tooltip': {
      color: theme.palette.text.primary + '!important',
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius + 'px',
      boxShadow: theme.shadows[3],
    },
    '& .ag-select': {
      '& .ag-picker-field-wrapper': {
        backgroundColor: theme.palette.background.paper,
        padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
        '&:hover': {
          cursor: 'pointer',
        },
        border: `1px solid ${theme.palette.action.disabled}`,
      },
    },
    '& .ag-radio-button:hover': {
      cursor: 'pointer',
    },
    '& input': {
      color: theme.palette.text.primary + '!important',
      '&::placeholder': {
        color: theme.palette.text.disabled + '!important',
      },
    },
    '& .ag-select-list': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius + 'px',
      boxShadow: theme.shadows[3],
      '& .ag-select-list-item': {
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5),
        transition: theme.transitions.create(['background-color'], {
          duration: theme.transitions.duration.shorter,
        }),
        '&:hover': {
          backgroundColor: alpha(theme.palette.text.primary, 0.15),
        },
        '&.ag-active-item:not(:hover)': {
          backgroundColor: alpha(theme.palette.text.primary, 0.25),
        },
      },
    },
    '& .ag-radio-button-input-wrapper': {
      '&::after': {
        fontSize: 18,
        color: theme.palette.text.secondary,
      },
      '&.ag-checked::after': {
        color: theme.palette.primary.main,
      },
    },
    '& .ag-text-field-input': {
      transition: theme.transitions.create(['border-color'], {
        duration: theme.transitions.duration.shorter,
      }),
      borderColor: theme.palette.action.disabled + '!important',
      '&:focus': {
        borderColor: theme.palette.primary.main + '!important',
      },
    },
    '& .ag-popup': {
      backgroundColor: theme.palette.background.paper,
    },
    // Custom classes
    '& .ag-custom-stat-cell': {
      color: purple[700] + '!important',
    },
  },
});
