import { taskApi } from "../../api/api";

export const SET_TASKS = 'SET_TASKS';

export const fetchTasks = (data) => async (dispatch) => {
    try {
        const response = await taskApi.getTasks(data);
        // console.log(response.data);
        dispatch({
            type: SET_TASKS,
            payload: response.data,
        });
        return response.data;
    } catch (err) {
        console.log('!!! Error fetching tasks' + err);
    }
}