import { taskApi } from '../../api/api';

export const SET_TASKS = 'SET_TASKS';

export const fetchTasks = (userId) => async (dispatch) => {
    try {
        const response = await taskApi.getTasks(userId);
        let tasks;
        if (response.data.ec && response.data.ec === 1) {
            tasks = [];
        } else {
            tasks = response.data;
        }
        dispatch({
            type: SET_TASKS,
            payload: tasks,
        });
        return response.data;
    } catch (err) {
        console.log('!!! Error fetching tasks' + err);
    }
};
