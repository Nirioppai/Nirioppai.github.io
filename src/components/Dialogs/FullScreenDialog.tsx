import { FC, ReactElement, ReactNode, Ref, forwardRef } from 'react';

import {
  AppBar,
  Container,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material';
import type {
  AppBarProps,
  ContainerProps,
  DialogProps,
  IconButtonProps,
} from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import { ArrowLeft as ArrowLeftIcon } from 'mdi-material-ui';

export interface FullScreenDialogProps extends DialogProps {
  onClose: DialogProps['onClose'] | (() => void);
  /**
   * Disable the closing of the Dialog component.
   * Useful for doing API requests inside.
   */
  disableClose?: boolean;
  /**
   * Title of the Dialog component shown at the AppBar.
   */
  title: string;
  /**
   * Props passed to the close button (IconButton) component.
   */
  CloseButtonProps?: IconButtonProps;
  /**
   * Props passed to the Container component.
   */
  ContainerProps?: ContainerProps;
  /**
   * Props passed to the AppBar component.
   */
  AppBarProps?: AppBarProps;
  /**
   * Content of the Dialog component.
   */
  children: ReactNode;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: ReactElement },
  ref: Ref<unknown>
) {
  // @ts-ignore
  return <Slide direction='up' ref={ref} {...props} />;
});

export const FullScreenDialog: FC<FullScreenDialogProps> = ({
  // onClose = (e: any = {}, reason: any = 'backdropClick') => {},
  onClose,
  disableClose,
  title,
  CloseButtonProps,
  AppBarProps,
  ContainerProps,
  children,
  ...rest
}) => (
  <Dialog
    fullScreen
    onClose={onClose}
    TransitionComponent={Transition}
    disableEscapeKeyDown={disableClose}
    PaperProps={{
      sx: {
        backgroundImage: 'none',
        backgroundColor: 'background.default',
      },
    }}
    {...rest}
  >
    <AppBar
      sx={{
        position: 'relative',
        mb: 3,
      }}
      {...AppBarProps}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          edge='start'
          onClick={(e) => onClose?.(e, 'backdropClick')}
          aria-label='close'
          disabled={disableClose}
          {...CloseButtonProps}
        >
          <ArrowLeftIcon />
        </IconButton>
        <Typography
          variant='h3'
          sx={{
            flex: 1,
            ml: 2,
          }}
        >
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
    <Container
      maxWidth='lg'
      style={{ marginBottom: '1rem' }}
      {...ContainerProps}
    >
      <>{children}</>
    </Container>
  </Dialog>
);
