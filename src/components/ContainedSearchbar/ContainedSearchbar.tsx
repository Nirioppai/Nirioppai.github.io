import { FC, MouseEvent } from 'react';

import { IconButton, InputAdornment, InputBase, Paper } from '@mui/material';
import type { InputBaseProps } from '@mui/material';
import { Close as CloseIcon, Magnify as MagnifyIcon } from 'mdi-material-ui';

interface ContainedSearchbarProps extends InputBaseProps {
  maxWidth?: number | string;
  clearable?: boolean;
  onClear?: () => void;
}

const ContainedSearchbar: FC<ContainedSearchbarProps> = ({
  value,
  placeholder = 'Search',
  clearable = true,
  maxWidth = 400,
  onClear,
  ...rest
}) => {
  const handleMouseDownClear = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <Paper
      sx={(theme) => ({
        position: 'relative',
        maxWidth: { maxWidth },
        px: 2,
        py: 0.75,
        '&:focus-within': {
          boxShadow: 4,
          '& $searchIcon': {
            color: 'text.secondary',
          },
        },
        transition: theme.transitions.create(['box-shadow'], {
          duration: theme.transitions.duration.shorter,
        }),
      })}
    >
      <MagnifyIcon
        sx={(theme) => ({
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'text.disabled',
          transition: theme.transitions.create(['color'], {
            duration: theme.transitions.duration.shorter,
          }),
        })}
      />
      <InputBase
        {...rest}
        value={value}
        placeholder={placeholder}
        endAdornment={
          clearable &&
          !!value && (
            <InputAdornment position='end'>
              <IconButton
                size='small'
                edge='end'
                aria-label='clear search field'
                onClick={onClear}
                onMouseDown={handleMouseDownClear}
              >
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          )
        }
        sx={{
          width: '100%',
          height: 24.5,
          pl: 4,
          pr: 0,
          backgroundColor: 'transparent',
          border: 'none',
          outline: 'none',
          fontFamily: 'typography.fontFamily',
          boxShadow: 'none !important',
          '& input': {
            paddingRight: 0,
          },
        }}
      />
    </Paper>
  );
};

export default ContainedSearchbar;
