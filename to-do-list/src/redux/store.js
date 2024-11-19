import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import taskReducer from './reducers/taskReducer';
import categoryReducer from './reducers/categoryReducer';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    task: taskReducer,
    category: categoryReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;