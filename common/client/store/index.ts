import { createStore, combineReducers } from 'redux';
import { createWrapper, Context } from 'next-redux-wrapper';

// 여러 reducer를 사용하는 경우 reducer들을 하나로 묶어주는 메소드
// store에 저장되는 reducer는 오직 1개
const rootReducer = combineReducers({
  //
});

const makeStore = (context: Context) => createStore(rootReducer);

export const wrapper = createWrapper(makeStore, { debug: false });

export type RootState = ReturnType<typeof rootReducer>;
