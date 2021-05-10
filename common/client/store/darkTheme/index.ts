import { DarkThemeState, DarkThemeAction } from '../../types';

// Action Type
const TOGGLE = 'darkTheme/TOGGLE' as const;

// Action Creator
export const toggle = () => ({ type: TOGGLE });

// Initial State
const initialState: DarkThemeState = {
  isOn: true,
};

// Reducer
export default function darkThemeReducer(
  state: DarkThemeState = initialState,
  action: DarkThemeAction
): DarkThemeState {
  switch (action.type) {
    case TOGGLE:
      return { ...state, isOn: !state.isOn };
    default:
      return state;
  }
}
