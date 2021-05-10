import clsx from 'clsx';
import Link from 'next/link';

import { useCallback } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';

import DrawerMaterial from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SearchIcon from '@material-ui/icons/Search';

import { RootState } from '../../store';
import { toggle as toggleDrawer } from '../../store/drawer';

const menuItems = [
  { text: '현황판', icon: DashboardIcon, path: '/' },
  { text: '검색', icon: SearchIcon, path: '/search' },
];

const useStyles = makeStyles<Theme, { drawerWidth: number }>((theme: Theme) => ({
  drawer: {
    width: ({ drawerWidth }) => drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: ({ drawerWidth }) => drawerWidth,
    transition: () =>
      theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
  },
  drawerClose: {
    transition: () =>
      theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    overflowX: 'hidden',
    width: () => theme.spacing(7) + 1,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: () => theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

export default function Drawer() {
  const drawerWidth = useSelector((state: RootState) => state.drawer.width);
  const isDrawerOpen = useSelector((state: RootState) => state.drawer.isOpen);

  const classes = useStyles({ drawerWidth });

  const dispatch = useDispatch();
  const handleDrawer = useCallback(() => {
    dispatch(toggleDrawer());
  }, []);

  return (
    <DrawerMaterial
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: isDrawerOpen,
        [classes.drawerClose]: !isDrawerOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: isDrawerOpen,
          [classes.drawerClose]: !isDrawerOpen,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {menuItems.map((menuItem) => (
          <Link key={menuItem.path} href={menuItem.path} passHref>
            <ListItem button component="a">
              <ListItemIcon>
                <menuItem.icon />
              </ListItemIcon>
              <ListItemText primary={menuItem.text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </DrawerMaterial>
  );
}
