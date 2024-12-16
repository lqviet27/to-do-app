import { categoryApi } from '../../api/api';

export const SET_CATEGORIES = 'SET_CATEGORIES';

export const fetchCategories = (userId) => async (dispatch) => {
    try {
        const reponse = await categoryApi.getCategories(userId);
        let categories;
        if (reponse.data.ec && reponse.data.ec === 1) {
            categories = [];
        } else {
            categories = reponse.data;
        }
        dispatch({
            type: SET_CATEGORIES,
            payload: categories,
        });
        return reponse.data;
    } catch (err) {
        console.log('!!! Error fetching categories' + err);
    }
};
