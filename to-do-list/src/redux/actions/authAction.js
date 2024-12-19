export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const SETUSER = 'SETUSER';

export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user,
});

export const logout = () => ({
    type: LOGOUT,
});

export const setUser = (user) => ({
    type: SETUSER,
    payload: user,
})
