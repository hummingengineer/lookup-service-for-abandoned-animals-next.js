import { toggle as toggleDarkTheme } from '../store/darkTheme';
import { toggle as toggleDrawer } from '../store/drawer';

export interface DarkThemeState {
  isOn: boolean;
}

export type DarkThemeAction = ReturnType<typeof toggleDarkTheme>;

export interface DrawerState {
  width: number;
  isOpen: boolean;
}

export type DrawerAction = ReturnType<typeof toggleDrawer>;

export interface Row {
  popfile: string;
  processState: string;
  happenDt: string;
  kindCd: string;
  happenPlace: string;
  careAddr: string;
  careTel: string;
}
