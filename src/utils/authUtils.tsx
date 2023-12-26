export const setSession = (username: string, token: string) => {
    localStorage.setItem('authUser', username);
    localStorage.setItem('authToken', token);
};

export const clearSession = () => {
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
};

export const getSessionToken = () => {
    return localStorage.getItem('authToken');
};
