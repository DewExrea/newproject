export function authHeader() {
    // return authorization header with jwt token
    let user = localStorage.getItem('username');

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}