import { toggle as toggleDarkTheme } from '../store/darkTheme';

export interface DarkThemeState {
  isOn: boolean;
}

export type DarkThemeAction = ReturnType<typeof toggleDarkTheme>;
