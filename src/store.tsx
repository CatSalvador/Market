import { createStore, combineReducers } from 'redux';
import ormReducer from "./redux/reducer.tsx";

const rootReducer = combineReducers({
    orm: ormReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;