import clsx from 'clsx';
import { useCallback } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';

import AppBarMaterial from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';

import { RootState } from '../../store';
import { toggle as toggleDrawer } from '../../store/drawer';
import { toggle as toggleDarkTheme } from '../../store/darkTheme';

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
