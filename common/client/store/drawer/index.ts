import { DrawerState, DrawerAction } from '../../types';

// Action Type
const TOGGLE = 'drawer/TOGGLE' as const;

// Action Creator
export const toggle = () => ({ type: TOGGLE });

// Initial State
const initialState: DrawerState = {
  width: 240,
  isOpen: false,
};

// Reducer
export default function drawerReducer(
  state: DrawerState = initialState,
  action: DrawerAction
): DrawerState {
  switch (action.type) {
    case TOGGLE:
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
}
