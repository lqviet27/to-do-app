import { taskApi } from "../../api/api";

export const SET_TASKS = 'SET_TASKS';

export const fetchTasks = (userId) => async (dispatch) => {
    try {
        const response = await taskApi.getTasks(userId);
        dispatch({
            type: SET_TASKS,
            payload: response.data,
        });
        return response.data;
    } catch (err) {
        console.log('!!! Error fetching tasks' + err);
    }
}