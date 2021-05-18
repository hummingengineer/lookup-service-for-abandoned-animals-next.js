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

export interface Form {
  bgnde: string;
  endde: string;
  upkind: string;
  kind: string;
  sido: string;
  sigungu: string;
  shelter: string;
  state: string;
  neuter_yn: string;
}

export interface Sido {
  orgCd: string;
  orgdownNm: string;
}

export interface Sigungu {
  orgCd: string;
  orgdownNm: string;
}

export interface Shelter {
  careRegNo: string;
  careNm: string;
}

export interface Kind {
  kindCd: string;
  KNm: string;
}
