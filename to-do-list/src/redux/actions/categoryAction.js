import { categoryApi } from '../../api/api';

export const SET_CATEGORIES = 'SET_CATEGORIES';

export const fetchCategories = (userId) => async (dispatch) => {
    try {
        const reponse = await categoryApi.getCategories(userId);
        dispatch({
            type: SET_CATEGORIES,
            payload: reponse.data,
        });
        return reponse.data;
    } catch (err) {
        console.log('!!! Error fetching categories' + err);
    }
};
