import {createStore, applyMiddleware, Store, AnyAction} from 'redux';
import {createWrapper, Context, HYDRATE} from 'next-redux-wrapper';
import { RootState, reducer } from './reducers';
import thunk, {ThunkDispatch} from "redux-thunk"

// create a makeStore function
const makeStore = (context: Context) => createStore(reducer, applyMiddleware(thunk));

// export an assembled wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore, {debug: false});

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>