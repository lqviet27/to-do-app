import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import taskReducer from './reducers/taskReducer';
import categoryReducer from './reducers/categoryReducer';

const rootReducer = combineReducers({
    task: taskReducer,
    category: categoryReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;