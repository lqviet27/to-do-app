import { SET_TASKS } from '../actions/taskAction';

const initialState = {
    tasks: [],
    loading: false,
    error: null,
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TASKS:
            return {
                ...state,
                tasks: action.payload,
            };
        default:
            return state;
    }
};

export default taskReducer;
