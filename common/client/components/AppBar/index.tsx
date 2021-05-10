import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { useCallback } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store';
import { toggle as toggleDrawer } from '../../store/drawer';
import { toggle as toggleDarkTheme } from '../../store/darkTheme';

const AppBarMaterial = dynamic(() => import('@material-ui/core/AppBar'));
const Toolbar = dynamic(() => import('@material-ui/core/Toolbar'));
const IconButton = dynamic(() => import('@material-ui/core/IconButton'));
const MenuIcon = dynamic(() => import('@material-ui/icons/Menu'));
const Typography = dynamic(() => import('@material-ui/core/Typography'));
const Switch = dynamic(() => import('@material-ui/core/Switch'));

const useStyles = makeStyles<Theme, { drawerWidth: number }>((theme: Theme) => ({
  appBar: {
    zIndex: () => theme.zIndex.drawer + 1,
    transition: () =>
      theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
  },
  appBarShift: {
    marginLeft: ({ drawerWidth }) => drawerWidth,
    width: ({ drawerWidth }) => `calc(100% - ${drawerWidth}px)`,
    transition: () =>
      theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  track: {
    '&:before, &:after': {
      display: 'inline-block',
      position: 'absolute',
      top: '52%',
      width: '50%',
      transform: 'translateY(-50%)',
      color: '#fff',
      textAlign: 'center',
    },
    '&:before': {
      content: '"🌜"',
      left: 4,
    },
    '&:after': {
      content: '"🌞"',
      right: 4,
    },
  },
}));

export default function AppBar() {
  const drawerWidth = useSelector((state: RootState) => state.drawer.width);
  const isDrawerOpen = useSelector((state: RootState) => state.drawer.isOpen);
  const isDarkTheme = useSelector((state: RootState) => state.darkTheme.isOn);

  const classes = useStyles({ drawerWidth });

  const dispatch = useDispatch();
  const handleDrawer = useCallback(() => {
    dispatch(toggleDrawer());
  }, []);
  const handleDarkTheme = useCallback(() => {
    dispatch(toggleDarkTheme());
  }, []);

  return (
    <AppBarMaterial
      position="fixed"
      className={clsx(classes.appBar, { [classes.appBarShift]: isDrawerOpen })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawer}
          edge="start"
          className={clsx(classes.menuButton, { [classes.hide]: isDrawerOpen })}
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6" noWrap color="inherit">
          유기동물 현황판
        </Typography>

        <Switch className={classes.track} checked={isDarkTheme} onChange={handleDarkTheme} />
      </Toolbar>
    </AppBarMaterial>
  );
}
