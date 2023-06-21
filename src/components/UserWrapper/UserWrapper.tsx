import { FC, MouseEvent, PropsWithChildren, useState } from 'react';

import {
  Box,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import { styled, useTheme } from '@mui/material/styles';
import {
  AccountCircle as AccountCircleIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  LockReset as LockResetIcon,
  LogoutVariant as LogoutVariantIcon,
  Menu as MenuIcon,
} from 'mdi-material-ui';
import { useSnackbar } from 'notistack';
import {
  NavLink,
  useMatch,
  useNavigate,
  useResolvedPath,
} from 'react-router-dom';

interface UserWrapperProps {
  userType: string;
}

import { businessOwnerDrawerItems } from './businessOwnerDrawerItems';
import { cashierDrawerItems } from './cashierDrawerItems';
import { systemAdministratorDrawerItems } from './systemAdministratorDrawerItems';

import { APP_NAME } from '~/constants';
import { UserAuth } from '~/contexts';

const drawerWidth = 240;

const DrawerListItem: FC<{
  label: string;
  Icon: FC;
  to: string;
}> = ({ label, Icon, to }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: false });

  return (
    <ListItemButton component={NavLink} to={to} selected={!!match}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

const openedMixin = (theme: any): any => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: any): any => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<any>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const UserWrapper: FC<PropsWithChildren<UserWrapperProps>> = ({
  children,
  userType,
}) => {
  // @ts-ignore
  const { logout } = UserAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (e) {
      enqueueSnackbar('Something went wrong.', { variant: 'error' });
    }
  };

  const [mobileOpen, setMobileOpen] = useState(false);
  // TODO: PASSWORD RESET MODAL
  // const [resetModalOpen, setResetModalOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const drawerItems =
    {
      systemAdministrator: systemAdministratorDrawerItems,
      cashier: cashierDrawerItems,
      businessOwner: businessOwnerDrawerItems,
    }[userType] || [];

  const drawer = (
    <div>
      {/* <Toolbar />
      <Divider /> */}
      <List>
        {drawerItems.map((drawerItem) => (
          <ListItem
            key={drawerItem.label}
            disablePadding
            sx={{ display: 'block' }}
          >
            <DrawerListItem
              label={drawerItem.label}
              Icon={drawerItem.Icon}
              to={`/${userType}/${drawerItem.path}`}
            />
            {drawerItem.hasDivider && <Divider sx={{ my: 1 }} />}
          </ListItem>
        ))}
      </List>
    </div>
  );

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' open={open}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h3' color='inherit' component='div'>
            {APP_NAME}
          </Typography>
          <IconButton
            color='inherit'
            sx={{ ml: 'auto' }}
            edge='end'
            onClick={handleClick}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id='account-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            elevation={3}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            {/* TODO: RESET PASSWORD MODAL */}
            <MenuItem
              onClick={() => console.log('RESET PASSWORD')}
              sx={{ py: 1 }}
            >
              <LockResetIcon
                sx={{
                  color: 'text.secondary',
                  mr: 1.5,
                }}
              />
              <Typography>Change Password</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ py: 1 }}>
              <LogoutVariantIcon
                sx={{
                  color: 'text.secondary',
                  mr: 1.5,
                }}
              />
              <Typography>Sign Out</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box component='nav' aria-label='mailbox folders'>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer variant='permanent' open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          {drawer}
          <Divider />
        </Drawer>
      </Box>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
      {/* TODO: RESET PASS MODAL */}
      {/* <ResetPassModal
        open={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
      /> */}
    </Box>
  );
};

export default UserWrapper;
